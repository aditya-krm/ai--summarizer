import { useState, useEffect, FormEvent } from "react";
import { useLazyGetSummaryQuery } from "../services/article";

import { link, loader } from "../assets";

interface Article {
  title: string;
  url: string;
  summary: string;
}

const Summary: React.FC = () => {
  const [article, setArticle] = useState<Article>({
    title: "",
    url: "",
    summary: "",
  });

  const [history, setHistory] = useState<Article[]>([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("history") || "[]") as Article[];
    setHistory(history);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedHistory = [newArticle, ...history];

      setArticle(newArticle);
      setHistory(updatedHistory);

      localStorage.setItem("history", JSON.stringify(updatedHistory));
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* search */}
      <div className="w-full flex flex-col gap-2">
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center"
        >
          <img
            src={link}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter article URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 bg-orange-500 text-white px-4"
          >
            ⏎
          </button>
        </form>

        {/* browse URL history(localStorage) */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {history.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* display summary */}
      <div className="max-w-full my-10 flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            {" "}
            Well, that wasn't supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {"data" in error ? (error as any).data.error : "An unexpected error occurred"}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-gray-700 text-sm">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Summary;
