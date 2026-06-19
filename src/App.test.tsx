import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import App from "./App";

describe("Orbit UI framework", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.lang = "en";
  });

  it("renders the bright Chinese AI-chat-first shell with Orbit navigation", () => {
    render(<App />);

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(document.documentElement.lang).toBe("zh-CN");
    expect(screen.getByRole("banner")).toHaveTextContent("Orbit Control");
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveTextContent("Orbit AI");
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveTextContent("活动");
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveTextContent("人脉");
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveTextContent("名片夹");
    expect(screen.getByRole("navigation", { name: "Primary" })).toHaveTextContent("分析");
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
    expect(screen.queryByText("仪表盘")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "询问 Orbit AI" })).toBeInTheDocument();
    expect(screen.getByRole("log", { name: "Orbit AI conversation" })).toHaveTextContent("你想在东京达成什么？");
    expect(screen.getByRole("complementary", { name: "AI 结果面板" })).toHaveTextContent("询问活动、人脉或网络分析后，这里会打开实时面板。");
    expect(screen.getByRole("region", { name: "实时关系轨道" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "轨道中心的用户头像" })).toBeInTheDocument();
    expect(screen.getAllByTestId("orbiting-contact")).toHaveLength(6);
  });

  it("switches to the dark theme without changing the Chinese product shell", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "深色" }));

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(screen.getByRole("heading", { name: "询问 Orbit AI" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "明亮" })).toBeInTheDocument();
  });

  it("opens recommended events from the AI chat", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "推荐活动" }));

    const results = screen.getByRole("complementary", { name: "AI 结果面板" });
    expect(within(results).getByRole("heading", { name: "推荐活动" })).toBeInTheDocument();
    expect(results).toHaveTextContent("AI Infrastructure Summit");
    expect(screen.getByRole("log", { name: "Orbit AI conversation" })).toHaveTextContent("找到了 3 个高信号活动");
  });

  it("opens people recommendations from the AI chat", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "推荐人脉" }));

    const results = screen.getByRole("complementary", { name: "AI 结果面板" });
    expect(within(results).getByRole("heading", { name: "人脉推荐" })).toBeInTheDocument();
    expect(results).toHaveTextContent("David Lin");
    expect(screen.getByRole("log", { name: "Orbit AI conversation" })).toHaveTextContent("排序了最可能产生有效对话的人");
  });

  it("keeps the shell and AI chat content localized to Chinese by default", async () => {
    render(<App />);

    expect(document.documentElement.lang).toBe("zh-CN");
    expect(screen.getByRole("heading", { name: "询问 Orbit AI" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "推荐活动" })).toBeInTheDocument();
    expect(screen.queryByText("仪表盘")).not.toBeInTheDocument();
  });

  it("localizes the AI analytics result panel to Chinese", async () => {
    const user = userEvent.setup();
    render(<App />);

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
