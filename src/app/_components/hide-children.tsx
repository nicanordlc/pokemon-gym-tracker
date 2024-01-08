import React from "react";

type HideChildrenProps = {
  container?: React.ElementType<{ className?: string }>;
  className?: string;
  children?: React.ReactNode;
  if?: boolean;
};

export function HideChildren(props: HideChildrenProps) {
  if (props.if) {
    return null;
  }

  const Container = props.container ?? "div";

  return <Container className={props.className}>{props.children}</Container>;
}
