"use client";

import { useState } from "react";
import Link from "next/link";
import { faqData } from "@/data/store";

type FaqLink = { label: string; href: string };

export function FaqAccordion({ items = faqData, links = [] }: { items?: string[][]; links?: FaqLink[] }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div>
      {items.map(([question, answer], index) => (
        <article className="faq" key={question}>
          <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
            {question}
            <span>{openFaq === index ? "-" : "+"}</span>
          </button>
          {openFaq === index ? <p>{renderAnswer(answer, links)}</p> : null}
        </article>
      ))}
    </div>
  );
}

function renderAnswer(answer: string, links: FaqLink[]) {
  const match = links.find((link) => answer.includes(link.label));
  if (!match) return answer;
  const [before, after] = answer.split(match.label);
  return <>{before}<Link href={match.href}>{match.label}</Link>{after}</>;
}
