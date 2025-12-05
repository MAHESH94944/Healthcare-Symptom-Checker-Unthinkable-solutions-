import { useState } from "react";

const SymptomForm = ({ onSubmit, loading }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || loading) return;
    onSubmit(text.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center justify-between">
        <label className="text-slate-900 font-semibold text-lg">
          Describe your symptoms
        </label>
        <span className="badge bg-emerald-100 text-emerald-700">
          Educational insights
        </span>
      </div>

      <textarea
        className="w-full min-h-44 rounded-2xl shadow-md border border-slate-300/70
          bg-white/70 backdrop-blur focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500
          p-4 text-slate-800 placeholder:text-slate-400 transition-all"
        placeholder="Describe your symptoms..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className="group w-full rounded-2xl py-3.5 text-white font-semibold tracking-wide
          bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500
          shadow-lg shadow-blue-600/20
          hover:scale-[1.01] hover:shadow-xl hover:shadow-indigo-600/25
          disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 ease-out"
      >
        <span className="inline-flex items-center gap-2">
          {loading ? (
            <>
              <span className="h-4 w-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <span className="inline-block h-2 w-2 rounded-full bg-white/80 group-hover:bg-white" />
              Check Symptoms
            </>
          )}
        </span>
      </button>
    </form>
  );
};

export default SymptomForm;
