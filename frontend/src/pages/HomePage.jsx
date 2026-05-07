import { useEffect, useState } from "react";
import { getUsers } from "../api/userApi.js";
import { getSkills } from "../api/skillsApi.js";
import { getOfferedSkills, getDesiredSkills } from "../api/userSkillsApi.js";

const demoUsers = [
    {
        id: 1,
        username: "Alex Chen",
        bio: "I love coding and music.",
        offeredSkills: ["React", "JavaScript"],
        desiredSkills: ["Guitar", "Cooking"],
    },
    {
        id: 2,
        username: "Maria Lopez",
        bio: "Designer and artist.",
        offeredSkills: ["Photoshop", "UI Design"],
        desiredSkills: ["Python", "Public Speaking"],
    },
    {
        id: 3,
        username: "David Kim",
        bio: "Fitness trainer who wants to learn web development.",
        offeredSkills: ["Workout Plans", "Nutrition"],
        desiredSkills: ["Web Development"],
    },
];

function HomePage() {
    const [users, setUsers] = useState(demoUsers);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const usersResponse = await getUsers();
            const skillsResponse = await getSkills();

            const allUsers = usersResponse.data;
            const allSkills = skillsResponse.data;

            if (!allUsers || allUsers.length === 0) {
                setUsers(demoUsers);
                return;
            }

            const usersWithSkills = await Promise.all(
                allUsers.map(async (user) => {
                    const offeredResponse = await getOfferedSkills(user.id);
                    const desiredResponse = await getDesiredSkills(user.id);

                    const offeredSkills = offeredResponse.data.map((userSkill) => {
                        const skill = allSkills.find((s) => s.id === userSkill.skillId);
                        return skill ? skill.name : "Unknown Skill";
                    });

                    const desiredSkills = desiredResponse.data.map((userSkill) => {
                        const skill = allSkills.find((s) => s.id === userSkill.skillId);
                        return skill ? skill.name : "Unknown Skill";
                    });

                    return {
                        ...user,
                        offeredSkills,
                        desiredSkills,
                    };
                })
            );

            setUsers(usersWithSkills);
        } catch (err) {
            console.log(err);
            setUsers(demoUsers);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        setIndex((prev) => prev + 1);
    };

    if (loading) {
        return (
            <div className="discover-page">
                <h1>Loading...</h1>
            </div>
        );
    }

    const currentUser = users[index];

    if (!currentUser) {
        return (
            <div className="discover-page">
                <h1>No more users</h1>
                <p>Check back later for more people.</p>
            </div>
        );
    }

    return (
        <div className="discover-page">
            <div className="discover-header">
                <span>{users.length - index} people left</span>
            </div>

            <div className="user-swipe-card">
                <div className="user-swipe-card__header">
                    <div className="user-swipe-card__avatar">
                        {currentUser.username?.[0]}
                    </div>

                    <div className="user-swipe-card__info">
                        <h2 className="user-swipe-card__name">{currentUser.username}</h2>
                        <p className="user-swipe-card__bio">{currentUser.bio}</p>
                    </div>
                </div>

                <p className="user-swipe-card__label">Can Teach</p>
                <div className="user-swipe-card__tags">
                    {currentUser.offeredSkills.map((skill) => (
                        <span key={skill} className="tag tag--offer">
              {skill}
            </span>
                    ))}
                </div>

                <p className="user-swipe-card__label">Wants to Learn</p>
                <div className="user-swipe-card__tags">
                    {currentUser.desiredSkills.map((skill) => (
                        <span key={skill} className="tag tag--want">
              {skill}
            </span>
                    ))}
                </div>

                <div className="user-swipe-card__actions">
                    <button className="btn-pass" onClick={handleNext}>
                        Pass
                    </button>

                    <button className="btn-connect" onClick={handleNext}>
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;