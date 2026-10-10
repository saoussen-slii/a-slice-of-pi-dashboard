import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DateFilters from "./DateFilters";
import i18n from "../../i18n";

describe("DateFilters", () => {
  it("renders accessible date pickers with ISO-formatted values", () => {
    render(
      <DateFilters
        startDate="2023-01-01"
        endDate="2023-12-31"
        onStartDateChange={vi.fn()}
        onEndDateChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("group", { name: "Filter orders by date" })).toBeInTheDocument();
    expect(screen.getByLabelText("Start date")).toHaveValue("2023-01-01");
    expect(screen.getByLabelText("End date")).toHaveValue("2023-12-31");
    expect(screen.getByLabelText("Start date")).toHaveAttribute(
      "aria-describedby",
      "start-date-help",
    );
    expect(screen.getByLabelText("End date")).toHaveAttribute(
      "aria-describedby",
      "end-date-help",
    );
  });

  it("selects a date using keyboard navigation and returns ISO format", () => {
    const onStartDateChange = vi.fn();
    render(
      <DateFilters
        startDate="2023-01-01"
        endDate=""
        onStartDateChange={onStartDateChange}
        onEndDateChange={vi.fn()}
      />,
    );

    const input = screen.getByLabelText("Start date");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });

    const calendar = within(screen.getByRole("dialog")).getByRole("rowgroup", {
      name: "Month January, 2023",
    });
    const selectedDay = within(calendar).getByRole("gridcell", {
      name: "Choose Sunday, January 1st, 2023",
    });
    fireEvent.keyDown(selectedDay, { key: "ArrowRight" });
    fireEvent.keyDown(
      within(calendar).getByRole("gridcell", {
        name: "Choose Monday, January 2nd, 2023",
      }),
      { key: "Enter" },
    );

    expect(onStartDateChange).toHaveBeenCalledWith("2023-01-02");
  });

  it("prevents navigating before 2023", () => {
    render(
      <DateFilters
        startDate=""
        endDate=""
        onStartDateChange={vi.fn()}
        onEndDateChange={vi.fn()}
      />,
    );

    const input = screen.getByLabelText("Start date");
    fireEvent.click(input);

    const calendar = within(screen.getByRole("dialog")).getByRole("rowgroup", {
      name: "Month January, 2023",
    });
    expect(
      within(calendar).getByRole("gridcell", {
        name: "Choose Sunday, January 1st, 2023",
      }),
    ).toHaveAttribute("aria-disabled", "false");
    expect(
      within(screen.getByRole("dialog")).queryByRole("button", {
        name: "Previous month",
      }),
    ).not.toBeInTheDocument();
  });

  it("prevents navigating past 2023", () => {
    render(
      <DateFilters
        startDate=""
        endDate="2023-12-31"
        onStartDateChange={vi.fn()}
        onEndDateChange={vi.fn()}
      />,
    );
    const endDateInput = screen.getByLabelText("End date");
    fireEvent.click(endDateInput);
    const calendar = within(screen.getByRole("dialog")).getByRole("rowgroup", {
      name: "Month December, 2023",
    });
    expect(calendar).toBeInTheDocument();
    expect(
      within(screen.getByRole("dialog")).queryByRole("button", {
        name: "Next month",
      }),
    ).not.toBeInTheDocument();
  });

  it("updates labels when the active language changes", async () => {
    render(
      <DateFilters
        startDate=""
        endDate=""
        onStartDateChange={vi.fn()}
        onEndDateChange={vi.fn()}
      />,
    );

    await act(async () => {
      await i18n.changeLanguage("fr");
    });

    expect(screen.getByLabelText("Date de début")).toBeInTheDocument();
    expect(screen.getByLabelText("Date de fin")).toBeInTheDocument();
  });
});
