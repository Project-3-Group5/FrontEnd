export default function SkillCard({ skill, userCount = 0, onAdd }) {
    return (
        <div className="skill-card">
            <div className="skill-card__left">
                <div className="skill-card__name">{skill.name}</div>
                <div className="skill-card__category">{skill.category}</div>

                {skill.description && (
                    <div className="skill-card__desc">{skill.description}</div>
                )}
            </div>

            <div className="skill-card__right">
                <span className="skill-card__count">{userCount} users</span>

                {onAdd && (
                    <button className="skill-card__add-btn" onClick={onAdd}>
                        + Add
                    </button>
                )}
            </div>
        </div>
    );
}