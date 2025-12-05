import { useState } from "react";
import axios from "axios";
import SymptomForm from "./components/SymptomForm.jsx";
import OutputCard from "./components/OutputCard.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ErrorAlert from "./components/ErrorAlert.jsx";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState({
    conditions: "",
    recommendations: "",
    disclaimer: "",
  });

  const handleSubmit = async (symptomText) => {
    setError("");
    setLoading(true);
    setResponseData({ conditions: "", recommendations: "", disclaimer: "" });
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/symptoms/check",
        { symptomText }
      );
      setResponseData({
        conditions: data?.conditions || "",
        recommendations: data?.recommendations || "",
        disclaimer: data?.disclaimer || "",
      });
    } catch (e) {
      const msg =
        e?.response?.data?.error ||
        e?.message ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated gradient accent */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-emerald-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-500/20 via-indigo-500/20 to-blue-500/20 blur-3xl animate-pulse [animation-duration:3s]" />
      </div>

      <header className="px-4 md:px-6 py-10 md:py-14 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold heading-gradient">
          Healthcare Symptom Checker
        </h1>
        <p className="text-slate-600 mt-3 md:mt-4 max-w-2xl mx-auto">
          Enter your symptoms to get educational health insights. This does not
          replace professional medical advice.
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 pb-16 space-y-8">
        <div className="card p-6 md:p-8 space-y-5">
          <SymptomForm onSubmit={handleSubmit} loading={loading} />
          {error ? <ErrorAlert message={error} /> : null}
        </div>

        {loading ? <LoadingSpinner /> : null}

        {(responseData.conditions ||
          responseData.recommendations ||
          responseData.disclaimer) &&
        !loading ? (
          <div className="mt-2">
            <OutputCard
              conditions={responseData.conditions}
              recommendations={responseData.recommendations}
              disclaimer={responseData.disclaimer}
            />
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default App;
