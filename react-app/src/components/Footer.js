import React from "react";

const Footer = () => {
const linkedIn = "https://www.linkedin.com/in/jacob-weller-592795161/"
const github = "https://github.com/WellerJay118"

    return (
        <div>
            <button>
                <a target="_blank" rel="noreferrer" href={github}>
                    <i className="fab fa-github"></i>
                </a>
            </button>
            <button>
                <a target="_blank" rel="noreferrer" href={linkedIn}>
                    <i className="fab fa-linkedin"></i>
                </a>
            </button>
        </div>
    )
}

export default Footer;
