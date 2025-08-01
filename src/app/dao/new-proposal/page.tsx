"use client";

import { useState, FormEvent, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

import CustomButton2 from "@/components/CustomButton2";
import SubmitButton from "@/assets/images/buttons/arrow-up-button.webp";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface FormData {
  title: string;
  summary: string;
  category: string;
  attachment?: File;
}

interface FormErrors {
  title?: string;
  summary?: string;
  category?: string;
}

export default function NewProposal() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    summary: "",
    category: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] =
    useState<boolean>(false);
  const { user } = useAuth();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dao/getDashboard`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user?.email }), // use email from checkAuth
        });
        const data = await res.json();
        console.log("role", data?.data.role)
        if (res.ok && data?.data.role) {
          setUserRole(data?.data.role.toLowerCase());
          if (data?.data.role.toLowerCase() !== "leader gopher") {
            router.push("/dao"); // redirect to proposals if not leader
          }
        } else {
          router.push("/dao"); // fallback redirect
        }
      } catch (err) {
        console.error("Error fetching role", err);
        router.push("/dao");
      }
    };

    if (user?.email) {
      fetchUserRole();
    }
  }, [user]);

  const categories = [
    "Treasury Management",
    "Protocol Upgrades",
    "Community Initiatives",
    "Partnerships",
    "Marketing",
    "Development",
    "Governance",
    "Other",
  ];

  if (!userRole) {
    return <div className="mt-60 text-center text-2xl">Checking access...</div>;
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "Summary is required.";
    } else if (formData.summary.length < 10) {
      newErrors.summary = "Summary must be at least 10 characters long.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!validateForm()) return;

    try {
      const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
      const proposalId = `prop_${timestamp}_${formData.category.replace(/\s+/g, '_').toLowerCase()}_001`;
      const taskId = `task_${timestamp}_${formData.category.replace(/\s+/g, '_').toLowerCase()}_001`;

      // Simulate IPFS upload or placeholder
      const attachmentUrls = formData.attachment
        ? [`https://ipfs.io/ipfs/fakeHash/${formData.attachment.name}`]
        : [];

      const payload = {
        title: formData.title,
        taskId,
        proposalId,
        description: formData.summary,
        status: "Voting",
        tags: formData.title
          .toLowerCase()
          .split(' ')
          .filter((word) => word.length > 2), // basic tag generator
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days later
        attachments: attachmentUrls,
        comments: [],
        upvotes: 0,
        downvotes: 0,
        upvotedBy: [],
        downvotedBy: [],
        isActive: true,
        isCompleted: false,
        isRejected: false,
        isDraft: false,
        isArchived: false,
        isApproved: false,
        isClaimed: false,
        isSubmitted: true,
        isVoting: true,
        isTask: false,
        isProposal: true,
        summary: formData.summary, // short summary
        createdBy: "support@bitcoinyay.com", // Replace with dynamic user email if available
        category: formData.category,
        votingDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        roleRequired: "Member",
        votes: [],
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dao/createProposal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Proposal submitted successfully!");
        setFormData({
          title: "",
          summary: "",
          category: "",
        });
        setFormSubmitted(false);
        setErrors({});
      } else {
        alert("Submission failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An unexpected error occurred while submitting the proposal.");
    }
  };


  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        attachment: file,
      }));
    }
  };

  return (
    <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40">
      <div>
        <h1 className="text-3xl md:text-7xl text-center font-semibold">
          Submit New Gopher DAO Proposal
        </h1>
      </div>
      <div className="mt-20 md:mt-40">
        <div className="flex flex-col items-center justify-center">
          <form className="max-w-4xl w-full">
            {/* Title Field */}
            <div className="mb-16">
              <label htmlFor="title" className="block text-2xl mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full text-xl p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary"
                placeholder="Type your title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
              {formSubmitted && errors.title && (
                <p className="text-red-700 text-base mt-2">{errors.title}</p>
              )}
            </div>

            {/* Summary Field */}
            <div className="mb-16">
              <label htmlFor="summary" className="block text-2xl mb-2">
                Summary
              </label>
              <textarea
                id="summary"
                rows={8}
                className="w-full text-xl p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary resize-vertical"
                placeholder="Provide a brief summary of your proposal"
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
              />
              {formSubmitted && errors.summary && (
                <p className="text-red-700 text-base mt-2">{errors.summary}</p>
              )}
            </div>

            {/* Category Field */}
            <div className="mb-16">
              <label htmlFor="category" className="block text-2xl mb-2">
                Category
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                  className="flex items-center gap-3 p-3 hover:bg-bg2 rounded-md cursor-pointer text-tertiary border border-bg3 w-full text-xl focus:border-primary hover:border-primary"
                >
                  <span className="flex-1 text-left">
                    {formData.category || "Select a category"}
                  </span>
                  <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
                </button>

                {isCategoryDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 w-full bg-bg2 rounded-md shadow-lg z-10 border border-bg">
                    <div className="py-1">
                      {categories.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => {
                            handleInputChange("category", category);
                            setIsCategoryDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-tertiary hover:bg-primary hover:text-bg transition-colors text-xl cursor-pointer flex items-center gap-3"
                        >
                          <span className="flex-1">{category}</span>
                          {formData.category === category && (
                            <Check
                              className="w-5 h-5 ml-auto"
                              strokeWidth={2.5}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {formSubmitted && errors.category && (
                <p className="text-red-700 text-base mt-2">{errors.category}</p>
              )}
            </div>

            {/* Attachment Field */}
            <div className="mb-16">
              <label htmlFor="attachment" className="block text-2xl mb-2">
                Attachment (Optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="attachment"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                />
                <div className="flex items-center justify-center w-full max-w-xs text-xl p-3 text-primary border border-primary border-dashed rounded-md cursor-pointer">
                  <span className="text-primary">
                    {formData.attachment
                      ? formData.attachment.name
                      : "Attach File"}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-20">
              <div
                onClick={(e) => handleFormSubmit(e as unknown as FormEvent<HTMLFormElement>)}
              >
                <CustomButton2
                  image={SubmitButton}
                  text="Submit Proposal"
                  link="#"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
