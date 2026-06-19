import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import App from "./App";

describe("Orbit UI framework", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.lang = "en";
  });

  it("renders the dark AI-chat-first shell with Orbit navigation", () => {
    render(<App />);

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(screen.getByRole("banner")).toHaveTextContent("Orbit Control");
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveTextContent("Orbit AI");
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveTextContent("Events");
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveTextContent("People");
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveTextContent("Connections");
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveTextContent("Analytics");
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ask Orbit AI" })).toBeInTheDocument();
    expect(screen.getByRole("log", { name: "Orbit AI conversation" })).toHaveTextContent("What are you trying to achieve in Tokyo?");
    expect(screen.getByRole("complementary", { name: "AI results panel" })).toHaveTextContent("Ask for events, people, or network analysis to open a live panel here.");
    expect(screen.getByRole("region", { name: "Live relationship orbit" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Executive user at orbit center" })).toBeInTheDocument();
    expect(screen.getAllByTestId("orbiting-contact")).toHaveLength(6);
  });

  it("switches to the bright theme without changing the product shell", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Bright" }));

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(screen.getByRole("heading", { name: "Ask Orbit AI" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dark" })).toBeInTheDocument();
  });

  it("opens recommended events from the AI chat", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Recommend events" }));

    const results = screen.getByRole("complementary", { name: "AI results panel" });
    expect(within(results).getByRole("heading", { name: "Recommended Events" })).toBeInTheDocument();
    expect(results).toHaveTextContent("AI Infrastructure Summit");
    expect(screen.getByRole("log", { name: "Orbit AI conversation" })).toHaveTextContent("I found 3 high-signal events");
  });

  it("opens people recommendations from the AI chat", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Recommend people" }));

    const results = screen.getByRole("complementary", { name: "AI results panel" });
    expect(within(results).getByRole("heading", { name: "People Recommendations" })).toBeInTheDocument();
    expect(results).toHaveTextContent("David Lin");
    expect(screen.getByRole("log", { name: "Orbit AI conversation" })).toHaveTextContent("I ranked people by business fit");
  });

  it("localizes the shell and AI chat content to Chinese", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "中文" }));

    expect(document.documentElement.lang).toBe("zh-CN");
    expect(screen.getByRole("heading", { name: "询问 Orbit AI" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "推荐活动" })).toBeInTheDocument();
    expect(screen.queryByText("仪表盘")).not.toBeInTheDocument();
  });

  it("localizes the AI analytics result panel to Chinese", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "中文" }));
    await user.click(screen.getByRole("button", { name: "分析网络" }));

    const results = screen.getByRole("complementary", { name: "AI 结果面板" });
    expect(within(results).getByRole("heading", { name: "网络信号" })).toBeInTheDocument();
    expect(within(results).getByRole("heading", { name: "战略洞察" })).toBeInTheDocument();
    expect(results).toHaveTextContent("网络缺口分析");
    expect(results).not.toHaveTextContent("Strategic Insights");
  });

  it("localizes the shell and AI chat content to Japanese", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "日本語" }));

    expect(document.documentElement.lang).toBe("ja");
    expect(screen.getByRole("heading", { name: "Orbit AI に聞く" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "イベントを推薦" })).toBeInTheDocument();
    expect(screen.queryByText("ダッシュボード")).not.toBeInTheDocument();
  });
});
