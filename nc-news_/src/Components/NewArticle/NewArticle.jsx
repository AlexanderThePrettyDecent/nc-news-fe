import { useState, useEffect } from "react";
import "./newArticle.css";
import apiClient from "../../api";
import { useNavigate } from "react-router-dom";

const NewArticle = ({ user }) => {
  const [newArticle, setNewArticle] = useState({ topic: "coding" });
  const [topicList, setTopicList] = useState([]);
  const [currTitle, setCurrTitle] = useState("");
  const [currImage, setCurrImage] = useState("");
  const [currBody, setCurrBody] = useState("");
  const [currTopic, setCurrTopic] = useState("");
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/topics")
      .then((response) => {
        setTopicList(response.data.topics);
        setCurrTopic("coding");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const inputBodyChange = (e) => {
    setCurrBody(e.target.value);
  };

  const inputTitleChange = (e) => {
    setCurrTitle(e.target.value);
  };

  const inputImageChange = (e) => {
    setCurrImage(e.target.value);
  };

  const inputTopicChange = (e) => {
    setCurrTopic(e.target.value);
  };

  const postArticleHandler = () => {
    setNewArticle({
      title: currTitle,
      article_img_url: currImage,
      body: currBody,
      topic: currTopic,
      author: "weegembump",
    });
  };

  useEffect(() => {
    if (
      newArticle.body &&
      newArticle.title &&
      newArticle.topic &&
      newArticle.article_img_url
    ) {
      setReady(true);
    } else {
    }
  }, [newArticle]);

  const definitelyPost = () => {
    apiClient
      .post("/articles", newArticle)
      .then((response) => {
        console.log(response);
        navigate(`/articles/${response.data.article.article_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="newArticle">
      <h1>New Article</h1>
      <label className="newArticle__inputLabel">Title</label>
      <input onChange={inputTitleChange} className="newArticle__titleInput" />

      <label className="newArticle__inputLabel">Image Url</label>
      <input onChange={inputImageChange} className="newArticle__imageInput" />
      <img className="newArticle__previewImage" src={currImage} />

      <label className="newArticle__inputLabel">Article Body</label>
      <textarea onChange={inputBodyChange} className="newArticle__bodyInput" />
      <label>
        Topic:{"   "}
        <select
          onChange={inputTopicChange}
          className="newArticle__selectTopic"
          alue={newArticle.topic}
        >
          {topicList.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
              </option>
            );
          })}
        </select>
      </label>
      {!ready ? (
        <button onClick={postArticleHandler} type="button">
          Post Article
        </button>
      ) : (
        <div className="newArticle__submitZone">
          <label>Are you sure?</label>
          <button type="button" onClick={definitelyPost}>
            Yes
          </button>
          <button
            onClick={() => {
              setReady(false);
            }}
          >
            No
          </button>
        </div>
      )}
    </form>
  );
};

export default NewArticle;
