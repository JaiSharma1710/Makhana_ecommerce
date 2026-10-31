import type { CSSProperties, ReactNode } from "react";
import type { BlogSlug } from "@/lib/blog-posts";

type VisualTone = "orange" | "yellow" | "green" | "red";

type ComparisonItem = {
  title: string;
  subtitle?: string;
  points: string[];
  tone?: VisualTone;
  symbol?: "makhana" | "lotus";
};

type ChecklistItem = {
  title: string;
  detail?: string;
};

export function BlogInsightCard({ kicker, title, children, tone = "orange" }: {
  kicker: string;
  title: string;
  children: ReactNode;
  tone?: VisualTone;
}) {
  return (
    <aside className="blog-visual blog-insight" data-tone={tone} aria-label={title}>
      <span className="blog-visual-kicker">{kicker}</span>
      <h3>{title}</h3>
      <div className="blog-insight-copy">{children}</div>
    </aside>
  );
}

export function BlogComparisonGrid({ kicker, title, items }: {
  kicker: string;
  title: string;
  items: ComparisonItem[];
}) {
  return (
    <aside className="blog-visual blog-comparison" aria-label={title}>
      <VisualHeading kicker={kicker} title={title} />
      <div className="blog-comparison-grid" style={{ "--visual-columns": items.length } as CSSProperties}>
        {items.map((item) => (
          <article data-tone={item.tone ?? "orange"} key={item.title}>
            {item.symbol ? <BotanicalGlyph kind={item.symbol} /> : null}
            <h4>{item.title}</h4>
            {item.subtitle ? <p className="blog-comparison-subtitle">{item.subtitle}</p> : null}
            <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </article>
        ))}
      </div>
    </aside>
  );
}

export function BlogProcessSteps({ kicker, title, steps }: {
  kicker: string;
  title: string;
  steps: ChecklistItem[];
}) {
  return (
    <aside className="blog-visual blog-process" aria-label={title}>
      <VisualHeading kicker={kicker} title={title} />
      <ol>
        {steps.map((step, index) => (
          <li key={step.title}>
            <span aria-hidden="true">{index + 1}</span>
            <div>
              <strong>{step.title}</strong>
              {step.detail ? <p>{step.detail}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}

export function BlogChecklistVisual({ kicker, title, items }: {
  kicker: string;
  title: string;
  items: ChecklistItem[];
}) {
  return (
    <aside className="blog-visual blog-checklist" aria-label={title}>
      <VisualHeading kicker={kicker} title={title} />
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <span aria-hidden="true">✓</span>
            <div>
              <strong>{item.title}</strong>
              {item.detail ? <p>{item.detail}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function BlogMetricCards({ kicker, title, metrics, note }: {
  kicker: string;
  title: string;
  metrics: Array<{ value: string; label: string }>;
  note?: string;
}) {
  return (
    <aside className="blog-visual blog-metrics" aria-label={title}>
      <VisualHeading kicker={kicker} title={title} />
      <dl>
        {metrics.map((metric) => (
          <div key={metric.value}>
            <dt>{metric.value}</dt>
            <dd>{metric.label}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className="blog-visual-note">{note}</p> : null}
    </aside>
  );
}

export function BlogDecisionVisual({ question, answer, checks }: {
  question: string;
  answer: string;
  checks: string[];
}) {
  return (
    <aside className="blog-visual blog-decision" aria-label={`${question} ${answer}`}>
      <span className="blog-decision-start">ROASTED</span>
      <span className="blog-decision-arrow" aria-hidden="true">↓</span>
      <h3>{question}</h3>
      <span className="blog-decision-arrow" aria-hidden="true">↓</span>
      <strong className="blog-decision-answer">{answer}</strong>
      <p>Check the finished packet:</p>
      <ul>{checks.map((check) => <li key={check}>{check}</li>)}</ul>
    </aside>
  );
}

export function BlogEditorialVisual({ slug, sectionHeading }: { slug: BlogSlug; sectionHeading: string }) {
  if (slug === "makhana-nutrition-facts") {
    if (sectionHeading === "How many calories are in 25 g, 30 g and 35 g of roasted makhana?") {
      return (
        <BlogMetricCards
          kicker="Portion snapshot"
          title="Khao Better Classic Roasted label-based values"
          metrics={[
            { value: "25 g", label: "~113 kcal" },
            { value: "30 g", label: "~135 kcal" },
            { value: "35 g", label: "~158 kcal" },
            { value: "100 g", label: "450 kcal" }
          ]}
          note="Calculated from the verified 450 kcal per 100 g label value and rounded for everyday reading."
        />
      );
    }
    if (sectionHeading === "Does Roasting Change Makhana Nutrition?") {
      return (
        <BlogInsightCard kicker="Important distinction" title="One makhana label ≠ every makhana label" tone="yellow">
          <p>Preparation, oil, seasoning and serving size can all change the finished product. Compare the actual label in your hand.</p>
        </BlogInsightCard>
      );
    }
    if (sectionHeading === "How to Read a Makhana Nutrition Label") {
      return (
        <BlogChecklistVisual
          kicker="Label-reading checklist"
          title="Read the serving before the headline"
          items={[
            { title: "Serving size", detail: "Check whether the panel is per serving, per pack or per 100 g." },
            { title: "Calories and total fat", detail: "Compare products on the same quantity." },
            { title: "Fibre and protein", detail: "Use the declared numbers, not the snack category." },
            { title: "Added sugar and sodium", detail: "Seasoning and coatings can change both." }
          ]}
        />
      );
    }
  }

  if (slug === "makhana-vs-popcorn-vs-chips") {
    if (sectionHeading === "The Quick Answer") {
      return (
        <BlogInsightCard kicker="Quick takeaway" title="The category name is not the nutrition label.">
          <p>Preparation, portion and seasoning decide what is actually in the snack—not the word makhana, popcorn or chips by itself.</p>
        </BlogInsightCard>
      );
    }
    if (sectionHeading === "What Changes the Nutrition Most?") {
      return (
        <BlogComparisonGrid
          kicker="Compare like with like"
          title="Three snacks, four questions"
          items={[
            { title: "Makhana", points: ["Roasted recipes can vary", "Pack or bowl size matters", "Oil and seasoning change the product", "Read the actual label"], tone: "orange" },
            { title: "Popcorn", points: ["Air-popped, stovetop and cinema formats differ", "Movie portions can be much larger", "Butter, cheese and caramel change the product", "Read the actual label"], tone: "yellow" },
            { title: "Chips", points: ["Preparation and labels vary", "Shared packs can hide portion size", "Seasoning changes the finished product", "Read the actual label"], tone: "red" }
          ]}
        />
      );
    }
    if (sectionHeading === "Which One Should You Choose?") {
      return (
        <BlogChecklistVisual
          kicker="Decision guide"
          title="Compare in this order"
          items={[
            { title: "Portion", detail: "Compare the amount you will actually eat." },
            { title: "Preparation", detail: "Notice roasting, air-popping, frying and added fats." },
            { title: "Seasoning", detail: "Butter, masala, cheese and sweet coatings can shift the label." },
            { title: "Full label", detail: "Judge the finished product, not an idealised category." }
          ]}
        />
      );
    }
  }

  if (slug === "makhana-vs-lotus-seeds") {
    if (sectionHeading === "The quick difference between makhana and lotus seeds") {
      return (
        <BlogComparisonGrid
          kicker="Botanical identity"
          title="Aquatic neighbours, different plants"
          items={[
            { title: "Makhana", subtitle: "Euryale ferox", points: ["Nymphaeaceae family", "Familiar popped, light form", "Often called fox nut or phool makhana"], tone: "orange", symbol: "makhana" },
            { title: "True lotus seed", subtitle: "Nelumbo nucifera", points: ["Nelumbonaceae family", "Denser seed or kernel", "Comes from the sacred lotus"], tone: "green", symbol: "lotus" }
          ]}
        />
      );
    }
    if (sectionHeading === "Why do people call makhana “lotus seeds”?") {
      return (
        <BlogInsightCard kicker="Naming vs botany" title="Commonly confused does not mean botanically identical" tone="green">
          <p>Both plants are aquatic and both produce edible seeds. Common trade language blurred the names; their botanical identities remain different.</p>
        </BlogInsightCard>
      );
    }
    if (sectionHeading === "How can you tell what you're buying?") {
      return (
        <BlogChecklistVisual
          kicker="Packet check"
          title="Start with the botanical name"
          items={[
            { title: "Euryale ferox", detail: "This identifies makhana." },
            { title: "Nelumbo nucifera", detail: "This identifies true lotus seed." },
            { title: "Finished form", detail: "Popped makhana and a whole lotus kernel are not the same food form." },
            { title: "Actual product label", detail: "Use the ingredient and serving information for comparisons." }
          ]}
        />
      );
    }
  }

  if (slug === "why-is-makhana-expensive-india") {
    if (sectionHeading === "3. The raw seed is not the makhana you eat") {
      return (
        <BlogProcessSteps
          kicker="From water to packet"
          title="Why the journey adds cost"
          steps={[
            { title: "Aquatic cultivation", detail: "The crop starts in water-based growing systems." },
            { title: "Seed collection", detail: "Traditional collection can involve retrieving seeds from the pond bed." },
            { title: "Cleaning, drying and grading", detail: "Raw seeds are prepared and sorted before popping." },
            { title: "Roasting and tempering", detail: "Heat and resting stages prepare the seed." },
            { title: "Popping", detail: "Timing and skilled handling affect the result." },
            { title: "Final grading", detail: "Size, uniformity and breakage separate commercial grades." },
            { title: "Packaging and market", detail: "Quality control, packing, logistics and retail add another layer." }
          ]}
        />
      );
    }
    if (sectionHeading === "10. Supply did not grow at the same speed") {
      return (
        <BlogComparisonGrid
          kicker="Why price rises"
          title="Several pressures meet in one packet"
          items={[
            { title: "Labour", points: ["Aquatic harvest", "Multi-stage processing", "Skilled popping"], tone: "orange" },
            { title: "Yield and grade", points: ["Not every seed becomes a large pop", "Breakage and sorting reduce premium output"], tone: "yellow" },
            { title: "Concentrated supply", points: ["Production is centred in a specialised region", "Supply cannot expand instantly"], tone: "green" },
            { title: "Demand", points: ["Domestic market growth", "Branded retail and export demand"], tone: "red" }
          ]}
        />
      );
    }
    if (sectionHeading === "14. Does expensive makhana automatically mean better makhana?") {
      return (
        <BlogInsightCard kicker="Price ≠ proof" title="A higher sticker price is not a complete quality test" tone="yellow">
          <p>Grade, sorting and pack quality can affect price—but branding, pack size, flavouring, distribution and retailer margins can affect it too.</p>
        </BlogInsightCard>
      );
    }
  }

  if (slug === "roasted-not-fried-makhana-oil") {
    if (sectionHeading === "What does “roasted, not fried” actually mean?") {
      return <BlogDecisionVisual question="Does it automatically mean oil-free?" answer="NO" checks={["Ingredient list", "Total fat", "Preparation claim", "Manufacturer information"]} />;
    }
    if (sectionHeading === "Roasted vs fried makhana: what is the practical difference?") {
      return (
        <BlogComparisonGrid
          kicker="Myth vs reality"
          title="Keep the preparation claim narrow"
          items={[
            { title: "MYTH", points: ["“Roasted means no oil.”"], tone: "red" },
            { title: "REALITY", points: ["Roasted describes preparation; oil use depends on the formulation."], tone: "green" }
          ]}
        />
      );
    }
    if (sectionHeading === "How to tell whether your roasted makhana contains oil") {
      return (
        <BlogChecklistVisual
          kicker="Label-reading order"
          title="Use the packet, not the front-of-pack impression"
          items={[
            { title: "Ingredients", detail: "Look for edible oils, ghee, butter and fat-containing seasoning." },
            { title: "Total and saturated fat", detail: "Do not reverse-engineer these numbers into an oil quantity." },
            { title: "Serving basis", detail: "Check per serving, per pack and per 100 g." },
            { title: "Preparation claim", detail: "Treat roasted and not fried as specific process statements." }
          ]}
        />
      );
    }
  }

  if (slug === "broken-makhana-packet-quality") {
    if (sectionHeading === "Broken vs flattened vs un-popped makhana") {
      return (
        <BlogComparisonGrid
          kicker="Four different observations"
          title="Shape, popping and texture are separate clues"
          items={[
            { title: "Broken", points: ["A physically fragmented pop", "Not automatically stale or unsafe"], tone: "orange" },
            { title: "Flattened", points: ["A shape characteristic used in grading", "Not a complete safety judgement"], tone: "yellow" },
            { title: "Un-popped", points: ["Seed or kernel material that did not fully pop", "Different from a broken popped piece"], tone: "red" },
            { title: "Stale / soft", points: ["A texture or freshness observation", "Often associated with moisture exposure"], tone: "green" }
          ]}
        />
      );
    }
    if (sectionHeading === "Does broken makhana mean it is stale?") {
      return (
        <BlogInsightCard kicker="Keep the clues separate" title="One broken piece is not a safety verdict">
          <p>Shape describes the piece. Crispness describes texture. Smell, moisture, mould, seal integrity and date information tell you more about packet condition.</p>
        </BlogInsightCard>
      );
    }
    if (sectionHeading === "What actually matters more than one broken piece?") {
      return (
        <BlogChecklistVisual
          kicker="Packet condition checklist"
          title="What matters more than one broken piece?"
          items={[
            { title: "Smell", detail: "Notice any unusual stale or rancid odour." },
            { title: "Moisture and mould", detail: "Do not eat food showing spoilage or contamination signs." },
            { title: "Crispness", detail: "Texture is separate from whether a piece is whole." },
            { title: "Intact packaging", detail: "Check the seal, seams and any puncture or leak." },
            { title: "Storage and best-before", detail: "Follow the information on the actual packet." }
          ]}
        />
      );
    }
  }

  if (slug === "makhana-weight-loss") {
    if (sectionHeading === "Roasted Makhana Calories by Portion") {
      return (
        <BlogMetricCards
          kicker="Portion awareness"
          title="The serving changes the calorie total"
          metrics={[
            { value: "25 g", label: "~113 kcal" },
            { value: "30 g", label: "~135 kcal" },
            { value: "35 g", label: "~158 kcal" },
            { value: "50 g", label: "225 kcal" }
          ]}
          note="Khao Better Classic Roasted label-based values, calculated from 450 kcal per 100 g and rounded where shown."
        />
      );
    }
    if (sectionHeading === "Why Portion Size Matters") {
      return (
        <BlogComparisonGrid
          kicker="Myth vs reality"
          title="Makhana is a snack, not a weight-loss shortcut"
          items={[
            { title: "MYTH", points: ["“Makhana itself causes weight loss.”"], tone: "red" },
            { title: "REALITY", points: ["Weight management depends on the overall eating plan", "Portion size and preparation still matter"], tone: "green" }
          ]}
        />
      );
    }
    if (sectionHeading === "Common Portion Mistakes") {
      return (
        <BlogChecklistVisual
          kicker="Smart snack check"
          title="Plan the snack before opening the pack"
          items={[
            { title: "Check the serving size", detail: "Use the portion you will actually eat." },
            { title: "Notice added fats and coatings", detail: "Oil, ghee, butter and sweet coatings can change calories." },
            { title: "Read the seasoning context", detail: "Plain and heavily seasoned products are not interchangeable." },
            { title: "Consider the whole day", detail: "A snack fits within meals, hunger, activity and overall intake." }
          ]}
        />
      );
    }
  }

  if (slug === "how-to-keep-roasted-makhana-crispy") {
    if (sectionHeading === "Quick answer: how to keep roasted makhana crispy") {
      return (
        <BlogComparisonGrid
          kicker="Storage do / don't"
          title="Keep moisture out"
          items={[
            { title: "DO", points: ["Use a dry airtight container when needed", "Close the pack quickly", "Use dry hands and utensils", "Store somewhere cool and dry"], tone: "green" },
            { title: "DON’T", points: ["Leave the packet open", "Expose it to steam or humidity", "Seal homemade makhana while warm", "Assume refrigeration is always better"], tone: "red" }
          ]}
        />
      );
    }
    if (sectionHeading === "Why does roasted makhana become soft after opening?") {
      return (
        <BlogProcessSteps
          kicker="How crunch is lost"
          title="Exposure changes the texture"
          steps={[
            { title: "Open the pack", detail: "The dry snack meets the surrounding air." },
            { title: "Moisture gets in", detail: "Humid air, steam or damp utensils increase exposure." },
            { title: "Texture softens", detail: "The light crunch can become soft or chewy." },
            { title: "Storage makes the difference", detail: "Quick resealing and dry storage help limit moisture." }
          ]}
        />
      );
    }
    if (sectionHeading === "How to make soggy makhana crispy again") {
      return (
        <BlogComparisonGrid
          kicker="Before re-crisping"
          title="Soft, or showing spoilage signs?"
          items={[
            { title: "Soft but otherwise normal", points: ["Gently dry-roast on low heat", "Cool completely before storing again", "No extra oil is generally needed"], tone: "green" },
            { title: "Spoilage signs", points: ["Visible mould", "Unusual smell or discoloration", "Do not re-roast to make it safe"], tone: "red" }
          ]}
        />
      );
    }
  }

  if (slug === "best-study-snacks-long-study-sessions-india") {
    if (sectionHeading === "What makes a good study snack?") {
      return (
        <BlogChecklistVisual
          kicker="Study-snack criteria"
          title="Practical beats magical"
          items={[
            { title: "Easy to portion", detail: "Decide the amount before sitting down." },
            { title: "Low mess", detail: "Keep books, notes and laptops practical." },
            { title: "Storage-aware", detail: "Choose for the fridge and facilities actually available." },
            { title: "Convenient", detail: "Preparation should not become a long distraction." },
            { title: "Enjoyable and satisfying", detail: "The snack should deal with real hunger and suit you." }
          ]}
        />
      );
    }
    if (sectionHeading === "What are the best no-fridge study snacks?") {
      return (
        <BlogComparisonGrid
          kicker="Choose for the setting"
          title="Useful study options, different practical roles"
          items={[
            { title: "Roasted chana", points: ["No preparation", "Travels well", "Easy to pre-portion"], tone: "orange" },
            { title: "Makhana", points: ["Crunchy and desk-friendly", "No refrigeration", "Check the actual product label"], tone: "yellow" },
            { title: "Fruit + nuts", points: ["Little preparation", "Portable options include banana or apple", "Portion the nuts first"], tone: "green" },
            { title: "Curd + fruit", points: ["Simple when refrigeration is available", "Less practical without reliable chilling"], tone: "red" }
          ]}
        />
      );
    }
    if (sectionHeading === "Build a simple study-snack kit") {
      return (
        <BlogProcessSteps
          kicker="Desk setup"
          title="Prepare once, then study"
          steps={[
            { title: "Fill a water bottle", detail: "Keep hydration within reach." },
            { title: "Choose one dry snack", detail: "Chana or makhana can work when storage is limited." },
            { title: "Add whole fruit if useful", detail: "A banana or apple travels easily." },
            { title: "Pre-portion it", detail: "Keep the main packet away from the desk." }
          ]}
        />
      );
    }
  }

  if (slug === "best-work-from-home-snacks-india") {
    if (sectionHeading === "Why is working-from-home snacking different from office snacking?") {
      return (
        <BlogChecklistVisual
          kicker="Desk-snack criteria"
          title="Make the home kitchen work for your routine"
          items={[
            { title: "Portionable", detail: "Bring one serving to the desk, not the full packet." },
            { title: "Low mess", detail: "Choose something practical around a laptop." },
            { title: "Easy to store", detail: "Use the refrigerator when needed and keep dry snacks sealed." },
            { title: "Quick to prepare", detail: "The snack should fit between meetings and main meals." },
            { title: "Deliberate", detail: "Snack for hunger, not only because the kitchen is nearby." }
          ]}
        />
      );
    }
    if (sectionHeading === "What should you eat during the 4–6 PM WFH slump?") {
      return (
        <BlogComparisonGrid
          kicker="Workday options"
          title="Match the snack to the break"
          items={[
            { title: "Dry and crunchy", points: ["Roasted chana", "Makhana", "Lightly seasoned popcorn"], tone: "orange" },
            { title: "Fruit-based", points: ["Whole fruit", "Fruit with a small portion of nuts"], tone: "green" },
            { title: "Fridge available", points: ["Plain curd with fruit", "Boiled eggs"], tone: "yellow" },
            { title: "Short kitchen break", points: ["Sprouts chaat", "Poha", "Dhokla"], tone: "red" }
          ]}
        />
      );
    }
    if (sectionHeading === "The simplest WFH snacking rule") {
      return (
        <BlogProcessSteps
          kicker="Simple decision flow"
          title="Choose deliberately, then return to work"
          steps={[
            { title: "Check hunger", detail: "You do not need a snack simply because food is nearby." },
            { title: "Choose one option", detail: "Match it to the gap, storage and preparation available." },
            { title: "Portion it", detail: "Leave the main packet in the kitchen." },
            { title: "Take a short break", detail: "Eat, then continue your workday." }
          ]}
        />
      );
    }
  }

  if (slug === "plain-vs-flavoured-makhana") {
    if (sectionHeading === "What stays the same?") {
      return (
        <BlogComparisonGrid
          kicker="Plain vs flavoured"
          title="The finished labels matter more than the names"
          items={[
            { title: "PLAIN / CLASSIC", points: ["May use makhana alone or include oil and salt", "The name does not reveal the full recipe", "Read its own serving size and panel"], tone: "orange" },
            { title: "FLAVOURED", points: ["Seasoning may add ingredients or allergens", "Oil, sodium, sugar and calories depend on formulation", "Not automatically nutritionally worse"], tone: "green" }
          ]}
        />
      );
    }
    if (sectionHeading === "How to compare two makhana packets fairly") {
      return (
        <BlogChecklistVisual
          kicker="Label-reading visual"
          title="Compare the same quantity first"
          items={[
            { title: "Serving size", detail: "Use per 100 g or the same gram portion." },
            { title: "Ingredients and allergens", detail: "Read the complete declarations for each variant." },
            { title: "Total and saturated fat", detail: "Compare the finished formulations." },
            { title: "Sodium", detail: "Use the panel rather than judging by taste." },
            { title: "Total and added sugar", detail: "They answer different label questions." }
          ]}
        />
      );
    }
    if (sectionHeading === "Plain vs flavoured: which is healthier?") {
      return (
        <BlogInsightCard kicker="Choose the actual packet" title="Plain or flavoured? The label decides more than the name." tone="yellow">
          <p>Choose using taste, serving size, ingredients, nutrition information and personal preference—not a moral ranking of flavour names.</p>
        </BlogInsightCard>
      );
    }
  }

  return null;
}

function VisualHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="blog-visual-heading">
      <span className="blog-visual-kicker">{kicker}</span>
      <h3>{title}</h3>
    </div>
  );
}

function BotanicalGlyph({ kind }: { kind: "makhana" | "lotus" }) {
  return (
    <svg className="blog-botanical-glyph" viewBox="0 0 96 72" aria-hidden="true" focusable="false">
      {kind === "makhana" ? (
        <>
          <path d="M13 57C27 42 34 25 46 13c8 13 18 28 36 44-22 9-47 9-69 0Z" fill="#dcecc4" />
          <circle cx="48" cy="39" r="19" fill="#fff7e9" stroke="#442b1f" strokeWidth="3" />
          <circle cx="40" cy="33" r="2" fill="#ff6a00" /><circle cx="55" cy="31" r="2" fill="#ff6a00" />
          <circle cx="58" cy="45" r="2" fill="#ff6a00" /><circle cx="38" cy="47" r="2" fill="#ff6a00" />
        </>
      ) : (
        <>
          <path d="M48 59C27 58 16 49 16 38c10 1 18 4 24 10-6-12-3-25 8-35 11 10 14 23 8 35 6-6 14-9 24-10 0 11-11 20-32 21Z" fill="#dcecc4" stroke="#356b35" strokeWidth="3" strokeLinejoin="round" />
          <path d="M48 18v44" stroke="#356b35" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
