import React, { isValidElement, ReactNode } from "react";

export function splitTextIntoWords(node: ReactNode, keyPrefix = "w"): ReactNode[] {
  if (typeof node === "string") {
    return node.split(/\s+/).filter(w => w.length > 0).map((word, i) => (
      <span key={`${keyPrefix}-${i}`} className="inline-block overflow-hidden pb-1 mr-[0.25em] align-bottom">
        <span className="anim-word inline-block">{word}</span>
      </span>
    ));
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <React.Fragment key={`${keyPrefix}-arr-${i}`}>
        {splitTextIntoWords(child, `${keyPrefix}-${i}`)}
      </React.Fragment>
    ));
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    const children = node.props.children;
    if (children) {
      return [
        React.cloneElement(
          node,
          { key: node.key ?? `${keyPrefix}-el` },
          splitTextIntoWords(children, `${keyPrefix}-c`)
        )
      ];
    }
  }

  return [node];
}
