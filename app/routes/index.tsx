import { createFileRoute } from "@tanstack/react-router";
import { Story } from "@/component/story/story";

// @ts-ignore -- route type inference differs between versions, ignore here
export const Route = createFileRoute("/")({
  component: Story,
});
