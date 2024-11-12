import React, { useEffect, useState } from "react";
import "./Candidate.css";
import { IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight, FaFilter } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import Table from "../Table/Table";
import axios from "axios";
import { debounce } from "lodash";
import { Link } from "react-router-dom";


const Candidate = () => {
  const [candidatesList, setCandidatesList] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(10);
  const [filter, setFilter] = useState(false);
  const [experienceInput, setExperienceInput] = useState(false);
  const [skillCheckInput, setSkillCheckInput] = useState(false);
  const [skillSearch, setSkillSearch] = useState("");
  const [skillsList, setSkillsList] = useState([]);
  const [experience, setExperience] = useState({ min: "", max: "" });
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://truee-innovate-backend-2.onrender.com/api/v1/candidate");
        setCandidatesList(response.data.candidates);
        setFilteredList(response.data.candidates);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    getData();
  }, []);

  const onClickPrevious = () => {
    setPagination(prev => (prev > 10 ? prev - 10 : prev));
  };

  const onClickNext = () => {
    if (pagination / 10 < Math.ceil(filteredList.length / 10)) {
      setPagination(pagination + 10);
    }
  };

  const filterCandidates = debounce(() => {
    const filtered = candidatesList.filter(candidate => {
      const name = candidate.name?.toLowerCase() || "";
      const phone = candidate.phone?.toLowerCase() || "";
      const email = candidate.email?.toLowerCase() || "";

      const matchesNameOrEmailOrPhone = name.includes(search.toLowerCase()) ||
        phone.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase());

      const experienceMatch = experience.min === "" && experience.max === "" ||
        (candidate.experience >= experience.min && candidate.experience <= experience.max);

      const matchesSkill = skillsList.length === 0 ||
        skillsList.some(skill => candidate.skills.includes(skill));

      return matchesNameOrEmailOrPhone && matchesSkill && experienceMatch;
    });

    setFilteredList(filtered);
  }, 300); // 300ms debounce

  useEffect(() => {
    filterCandidates();
  }, [search, skillsList, experience,candidatesList]);

  const removeSkill = index => {
    setSkillsList(prev => prev.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    if (skillSearch.trim() && !skillsList.includes(skillSearch.trim())) {
      setSkillsList([...skillsList, skillSearch.trim()]);
    }
    setSkillSearch("");
  };

  return (
    <div className="candidate-section">
      <div className="inner-section">
        <div className="candidate-section-1--div">
          <h1>Candidate</h1>
          <button className="add-btn"><Link to='/new-candidate'>Add</Link></button>
        </div>
        <div className="candidate-section-2--div">
          <div className="icon">
            <IoMenu size={30} fill="#B0C9CC" />
          </div>
          <div className="search-filter-container">
            <div className="search-container">
              <CiSearch />
              <input
                type="search"
                placeholder="Search by Candidate, Phone, Email."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="pagination-container">
              <p>
                {pagination / 10}/{Math.ceil(filteredList.length / 10)}
              </p>
              <div className="page-icon" onClick={onClickPrevious}>
                <FaAngleLeft fill="#B0C9CC" size={25} />
              </div>
              <div className="page-icon" onClick={onClickNext}>
                <FaAngleRight fill="#B0C9CC" size={25} />
              </div>
            </div>
            <div className="sort-container" onClick={() => setFilter(!filter)}>
              <FaFilter size={24} fill="#B0C9CC" />
            </div>
          </div>
        </div>
      </div>

      <div className="candidate-section-3--div">
        <div style={{ width: "100%" }}>
          <Table lst={filteredList.slice(pagination - 10, pagination)} />
        </div>

        {/* Filter component */}
        {filter && (
          <div className="filter-container">
            <h3>Filter</h3>
            <div className="filter-content">
              <div className="experience-filter--container">
                <div className="experience-filter-top--container">
                  <input
                    id="experience_check"
                    type="checkbox"
                    checked={experienceInput}
                    onChange={(e) => setExperienceInput(e.target.checked)}
                  />
                  <label htmlFor="experience_check">Experience</label>
                </div>
                {experienceInput && (
                  <div className="experience-filter-salary-range--container">
                    <input
                      type="number"
                      placeholder="Min"
                      value={experience.min}
                      onChange={(e) => setExperience({ ...experience, min: e.target.value })}
                    />
                    <p>to</p>
                    <input
                      type="number"
                      placeholder="Max"
                      value={experience.max}
                      onChange={(e) => setExperience({ ...experience, max: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="experience-filter--container">
                <div className="experience-filter-top--container">
                  <input
                    id="skill_check"
                    type="checkbox"
                    checked={skillCheckInput}
                    onChange={(e) => setSkillCheckInput(e.target.checked)}
                  />
                  <label htmlFor="skill_check">Skills/Technology</label>
                </div>
                {skillCheckInput && (
                  <div className="skill-filter-salary-range--container">
                    <div style={{ display: "flex", flexWrap: "wrap", margin: "1rem 0" }}>
                      {skillsList.map((skill, index) => (
                        <button className="selected-skills-button" key={index} onClick={() => removeSkill(index)}>
                          {skill} <IoIosClose />
                        </button>
                      ))}
                    </div>
                    <div>
                      <input
                        type="search"
                        placeholder="Enter skills"
                        value={skillSearch}
                        required
                        onChange={(e) => setSkillSearch(e.target.value)}
                      />
                      <button onClick={addSkill}>Add</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidate;
