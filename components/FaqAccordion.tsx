"use client";

import { useState } from "react";
import { faqData } from "@/data/store";

export function FaqAccordion({ items = faqData }: { items?: string[][] }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div>
      {items.map(([question, answer], index) => (
        <article className="faq" key={question}>
          <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
            {question}
            <span>{openFaq === index ? "-" : "+"}</span>
          </button>
          {openFaq === index ? <p>{answer}</p> : null}
        </article>
      ))}
    </div>
  );
}
