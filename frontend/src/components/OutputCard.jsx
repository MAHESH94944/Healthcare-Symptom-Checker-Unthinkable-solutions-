const Section = ({ title, items }) => {
  if (!items || !items.length) return null;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500/80" />
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((li, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500/80" />
            <span className="text-slate-700 leading-relaxed">{li}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const OutputCard = ({ conditions, recommendations, disclaimer }) => {
  // Defensive: normalize all shapes to arrays of strings
  const normalizeToArray = (val) => {
    if (val == null) return [];
    if (Array.isArray(val))
      return val.map((v) => String(v).trim()).filter(Boolean);
    if (typeof val === "object") {
      try {
        // If object with fields, join their values
        return Object.values(val)
          .map((v) => String(v).trim())
          .filter(Boolean);
      } catch {
        return [String(val)];
      }
    }
    // String: split into lines
    const txt = String(val);
    return txt
      .split("\n")
      .map((l) =>
        l
          .trim()
          .replace(/^\*+\s?/, "")
          .replace(/^-\s?/, "")
      )
      .filter((l) => l.length);
  };

  const conditionItems = normalizeToArray(conditions);
  const recommendationItems = normalizeToArray(recommendations);

  if (!conditionItems.length && !recommendationItems.length && !disclaimer)
    return null;

  return (
    <div className="card p-8 fade-in space-y-8 animate-[fadeIn_300ms_ease-out]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-extrabold heading-gradient">
          Results
        </h2>
        <span className="badge bg-blue-100 text-blue-700">
          Safe • Educational
        </span>
      </div>

      <div className="soft-divider" />

      {conditionItems.length ? (
        <Section title="Possible Conditions & Causes" items={conditionItems} />
      ) : null}

      <div className="soft-divider" />

      {recommendationItems.length ? (
        <Section title="Recommended Next Steps" items={recommendationItems} />
      ) : null}

      {disclaimer ? (
        <>
          <div className="soft-divider" />
          <div className="mt-2 p-5 rounded-2xl border border-slate-200 bg-slate-50/90">
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong className="text-slate-900">
                Important Safety Disclaimer:
              </strong>{" "}
              {String(disclaimer)}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default OutputCard;
