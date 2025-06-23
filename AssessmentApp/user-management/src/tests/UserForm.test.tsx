import UserForm from "../components/UserForm";
import type { User } from "../types/User";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("UserForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();
  const user: User = {
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    company: "Acme Corp",
    jobTitle: "Developer"
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  it("renders all input fields and buttons", () => {
    render(<UserForm user={null} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Surname")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Company")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Job Title")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("fills form with user prop when provided", () => {
    render(<UserForm user={user} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Acme Corp")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Developer")).toBeInTheDocument();
  });

  it("calls onSubmit with form data when valid and filled", () => {
    render(<UserForm user={null} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Jane" } });
    fireEvent.change(screen.getByPlaceholderText("Surname"), { target: { value: "Smith" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "jane@smith.com" } });
    fireEvent.change(screen.getByPlaceholderText("Company"), { target: { value: "Beta Inc" } });
    fireEvent.change(screen.getByPlaceholderText("Job Title"), { target: { value: "Manager" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "Jane",
      surname: "Smith",
      email: "jane@smith.com",
      company: "Beta Inc",
      jobTitle: "Manager"
    });
  });

  it("shows alert and does not submit if required fields are missing or email is invalid", () => {
    window.alert = jest.fn();
    render(<UserForm user={null} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    fireEvent.click(screen.getByText("Submit"));
    expect(window.alert).toHaveBeenCalledWith("Please fill all fields correctly.");
    expect(mockOnSubmit).not.toHaveBeenCalled();
    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Jane" } });
    fireEvent.change(screen.getByPlaceholderText("Surname"), { target: { value: "Smith" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "invalidemail" } });
    fireEvent.change(screen.getByPlaceholderText("Company"), { target: { value: "Beta Inc" } });
    fireEvent.change(screen.getByPlaceholderText("Job Title"), { target: { value: "Manager" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(window.alert).toHaveBeenCalledWith("Please fill all fields correctly.");
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("calls onCancel when Cancel button is clicked", () => {
    render(<UserForm user={null} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
