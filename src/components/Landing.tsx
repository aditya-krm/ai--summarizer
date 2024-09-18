import { favicon } from "../assets";

const Landing: React.FC = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="w-full flex justify-between items-center mb-10 pt-3">
        <img src={favicon} alt="AI summarizer" className="w-8 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://github.com/aditya-krm/ai--summarizer")}
          className="black_btn"
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Summarize any article using <br className="max-md:hidden" />{" "}
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Enter the URL of the article you want to summarize and get a brief
        summary in seconds.
      </h2>
    </header>
  );
};

export default Landing;
