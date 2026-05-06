import { useEffect, useState } from "react";
import { getSkills, deleteSkill } from "../api/skillsApi.js";

const demoSkills = [
    {
        id: 1,
        name: "React",
        description: "Build frontend web apps.",
        category: "Programming",
    },
    {
        id: 2,
        name: "Java",
        description: "Backend and object-oriented programming.",
        category: "Programming",
    },
    {
        id: 3,
        name: "Guitar",
        description: "Learn basic chords and songs.",
        category: "Music",
    },
    {
        id: 4,
        name: "Cooking",
        description: "Basic meals and kitchen skills.",
        category: "Lifestyle",
    },
];

function Skills() {
    const [skills, setSkills] = useState(demoSkills);
    const [loading, setLoading] = useState(true);
    const [usingDemo, setUsingDemo] = useState(true);

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        try {
            const res = await getSkills();

            if (!res.data || res.data.length === 0) {
                setSkills(demoSkills);
                setUsingDemo(true);
                return;
            }

            setSkills(res.data);
            setUsingDemo(false);
        } catch (err) {
            console.log(err);
            setSkills(demoSkills);
            setUsingDemo(true);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (usingDemo) {
            setSkills(skills.filter((skill) => skill.id !== id));
            return;
        }

        try {
            await deleteSkill(id);
            loadSkills();
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return <p className="loading-msg">Loading skills...</p>;
    }

    return (
        <div className="skills-page">
            <h1>Skills</h1>

            {skills.length === 0 && <p>No skills found.</p>}

            {skills.map((skill) => (
                <div className="skill-card" key={skill.id}>
                    <div>
                        <p className="skill-card__name">{skill.name}</p>
                        <p className="skill-card__category">{skill.category}</p>
                        <p className="skill-card__desc">{skill.description}</p>
                    </div>

                    <button
                        className="skill-card__add-btn"
                        onClick={() => handleDelete(skill.id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Skills;
