import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../api/userApi.js";
import { getSkills } from "../api/skillsApi.js";
import {
    getOfferedSkills,
    getDesiredSkills,
    addSkillToUser,
} from "../api/userSkillsApi.js";

const demoSkills = [
    { id: 1, name: "React" },
    { id: 2, name: "JavaScript" },
    { id: 3, name: "Python" },
    { id: 4, name: "Cooking" },
    { id: 5, name: "Guitar" },
];

function Profile() {
    const userId = Number(localStorage.getItem("userId")) || 1;

    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [allSkills, setAllSkills] = useState(demoSkills);
    const [teachSkills, setTeachSkills] = useState([]);
    const [learnSkills, setLearnSkills] = useState([]);
    const [newTeachSkill, setNewTeachSkill] = useState("");
    const [newLearnSkill, setNewLearnSkill] = useState("");
    const [usingDemo, setUsingDemo] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    const getSkillNames = (userSkills, skills) => {
        return userSkills.map((userSkill) => {
            const skill = skills.find((s) => s.id === userSkill.skillId);
            return skill ? skill.name : "Unknown Skill";
        });
    };

    const loadDemoProfile = () => {
        const savedUsername = localStorage.getItem("username") || "Demo User";
        const savedBio = localStorage.getItem("bio") || "This is your profile page.";
        const savedTeachSkills =
            JSON.parse(localStorage.getItem("teachSkills")) || ["React"];
        const savedLearnSkills =
            JSON.parse(localStorage.getItem("learnSkills")) || ["Python"];

        setUsingDemo(true);
        setUser({ id: userId, username: savedUsername, bio: savedBio });
        setUsername(savedUsername);
        setBio(savedBio);
        setAllSkills(demoSkills);
        setTeachSkills(savedTeachSkills);
        setLearnSkills(savedLearnSkills);
    };

    const loadProfile = async () => {
        try {
            const userResponse = await getUserById(userId);
            const skillsResponse = await getSkills();
            const offeredResponse = await getOfferedSkills(userId);
            const desiredResponse = await getDesiredSkills(userId);

            const loadedUser = userResponse.data;
            const skills = skillsResponse.data;

            if (!loadedUser) {
                loadDemoProfile();
                return;
            }

            setUsingDemo(false);
            setUser(loadedUser);
            setUsername(loadedUser.username || "");
            setBio(loadedUser.bio || "");
            setAllSkills(skills && skills.length > 0 ? skills : demoSkills);
            setTeachSkills(getSkillNames(offeredResponse.data, skills));
            setLearnSkills(getSkillNames(desiredResponse.data, skills));
        } catch (err) {
            console.log(err);
            loadDemoProfile();
        }
    };

    const saveProfile = async () => {
        if (usingDemo) {
            localStorage.setItem("username", username);
            localStorage.setItem("bio", bio);
            setUser({ ...user, username, bio });
            setEditing(false);
            return;
        }

        try {
            const updatedUser = {
                ...user,
                username,
                bio,
            };

            await updateUser(userId, updatedUser);
            localStorage.setItem("username", username);
            setEditing(false);
            loadProfile();
        } catch (err) {
            console.log(err);
            localStorage.setItem("username", username);
            localStorage.setItem("bio", bio);
            setUser({ ...user, username, bio });
            setEditing(false);
        }
    };

    const addTeachSkill = async () => {
        if (!newTeachSkill) return;

        const selectedSkill = allSkills.find(
            (skill) => skill.id === Number(newTeachSkill)
        );

        if (!selectedSkill) return;

        if (usingDemo) {
            const updated = [...teachSkills, selectedSkill.name];
            setTeachSkills(updated);
            localStorage.setItem("teachSkills", JSON.stringify(updated));
            setNewTeachSkill("");
            return;
        }

        try {
            await addSkillToUser(userId, Number(newTeachSkill), true);
            setNewTeachSkill("");
            loadProfile();
        } catch (err) {
            console.log(err);
        }
    };

    const addLearnSkill = async () => {
        if (!newLearnSkill) return;

        const selectedSkill = allSkills.find(
            (skill) => skill.id === Number(newLearnSkill)
        );

        if (!selectedSkill) return;

        if (usingDemo) {
            const updated = [...learnSkills, selectedSkill.name];
            setLearnSkills(updated);
            localStorage.setItem("learnSkills", JSON.stringify(updated));
            setNewLearnSkill("");
            return;
        }

        try {
            await addSkillToUser(userId, Number(newLearnSkill), false);
            setNewLearnSkill("");
            loadProfile();
        } catch (err) {
            console.log(err);
        }
    };

    if (!user) {
        return (
            <div className="discover-page">
                <h1>Loading profile...</h1>
            </div>
        );
    }

    return (
        <div className="discover-page">
            <h1>My Profile</h1>

            <div className="user-swipe-card">
                <div className="user-swipe-card__header">
                    <div className="user-swipe-card__avatar">
                        {username?.[0]?.toUpperCase()}
                    </div>

                    <div className="user-swipe-card__info">
                        {editing ? (
                            <>
                                <div className="input-group">
                                    <label>Username</label>
                                    <input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Bio</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </div>

                                <button className="btn-primary" onClick={saveProfile}>
                                    Save Profile
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="user-swipe-card__name">{username}</h2>
                                <p className="user-swipe-card__bio">{bio}</p>

                                <button
                                    className="skill-card__add-btn"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit Profile
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <p className="user-swipe-card__label">Skills I Can Teach</p>

                <div className="input-group">
                    <select
                        value={newTeachSkill}
                        onChange={(e) => setNewTeachSkill(e.target.value)}
                    >
                        <option value="">Select a skill</option>
                        {allSkills.map((skill) => (
                            <option key={skill.id} value={skill.id}>
                                {skill.name}
                            </option>
                        ))}
                    </select>

                    <button className="btn-primary" onClick={addTeachSkill}>
                        Add Teach Skill
                    </button>
                </div>

                <div className="user-swipe-card__tags">
                    {teachSkills.length === 0 ? (
                        <span className="tag tag--offer">None yet</span>
                    ) : (
                        teachSkills.map((skill, index) => (
                            <span className="tag tag--offer" key={index}>
                {skill}
              </span>
                        ))
                    )}
                </div>

                <p className="user-swipe-card__label">Skills I Want to Learn</p>

                <div className="input-group">
                    <select
                        value={newLearnSkill}
                        onChange={(e) => setNewLearnSkill(e.target.value)}
                    >
                        <option value="">Select a skill</option>
                        {allSkills.map((skill) => (
                            <option key={skill.id} value={skill.id}>
                                {skill.name}
                            </option>
                        ))}
                    </select>

                    <button className="btn-primary" onClick={addLearnSkill}>
                        Add Learn Skill
                    </button>
                </div>

                <div className="user-swipe-card__tags">
                    {learnSkills.length === 0 ? (
                        <span className="tag tag--want">None yet</span>
                    ) : (
                        learnSkills.map((skill, index) => (
                            <span className="tag tag--want" key={index}>
                {skill}
              </span>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;