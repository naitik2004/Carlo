import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AuthForm({ title, fields, onSubmit }) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-900">{title}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="space-y-4"
      >
        {/* Render fields dynamically */}
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 text-gray-700 font-medium">
              {field.label}
            </label>
            <Input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <Button type="submit" className="w-full py-2 text-lg">
          {title}
        </Button>
      </form>
    </div>
  );
}
