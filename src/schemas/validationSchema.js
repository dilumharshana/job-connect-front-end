import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, isValidABN, isValidACN } from "./helpers";
// @ts-ignore
import validator from "validator";

// Function to check if a phone number is valid for the specified country
function isValidPhoneNumberForCountry(phoneNumberString, country) {
  const phoneNumber = parsePhoneNumberFromString(phoneNumberString, country);

  // If phoneNumber is undefined, it means parsing failed, so the number is not valid
  if (!phoneNumber) {
    return false;
  }

  // Check if the parsed phone number's country matches the specified country
  if (phoneNumber.country !== country) {
    return false;
  }

  // Return whether the phone number is valid
  return phoneNumber.isValid();
}

const addProtocolIfMissing = (url) => {
  const regex = /^(https:\/\/|www\.)/;
  if (regex.test(url)) {
    return url.startsWith("www.") ? "https://" + url : url;
  }
  return url;
};

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter an email address.")
    .email("Please enter a valid email address.")
});

export const createAdminSchema = z
  .object({
    profilePhoto: z.any().optional(),
    firstName: z
      .string()
      .min(1, "Please enter your first name.")
      .max(100)
      .trim()
      .nonempty("Please enter your first name.")
      .refine(
        (value) => {
          const regex1 = /^[a-zA-Z-']*$/; // REGEX allows only for Alphabet
          if (value === "") {
            return true;
          } else if (!value.match(regex1)) {
            return false;
          } else {
            return true;
          }
        },
        { message: "Please enter only alphabetical characters." }
      ),
    lastName: z
      .string()
      .min(1, "Please enter your last name.")
      .max(100)
      .trim()
      .nonempty("Please enter your last name.")
      .refine(
        (value) => {
          const regex1 = /^[a-zA-Z-']*$/;
          if (value === "") {
            return true;
          } else if (!value.match(regex1)) {
            return false;
          } else {
            return true;
          }
        },
        { message: "Please enter only alphabetical characters." }
      ),
    email: z
      .string()
      .min(1, "Please enter your email address.")
      .trim()
      .nonempty("Please enter your email address.")
      .email("Please enter a valid email address."),
    designation: z
      .string()
      .min(1, "Please enter your designation.")
      .trim()
      .nonempty("Please enter your designation.")
      .refine(
        (value) => {
          const regex1 = /^[a-zA-Z_ -]*$/; // Allowed only for the space underscore, space and hyphen allowed
          if (value === "") {
            return true;
          } else if (!value.match(regex1)) {
            return false;
          } else {
            return true;
          }
        },
        { message: "Only underscore, space and hyphens are allowed." }
      )
      .optional()
  })
  .refine(
    ({ profilePhoto }) => {
      return !profilePhoto || ACCEPTED_IMAGE_TYPES.includes(profilePhoto.type);
    },
    {
      message: "Profile picture must be in .jpg, .svg, or .png format.",
      path: ["profilePhoto"]
    }
  );

export const createLawFirmProfileSchema = z
  .object({
    encodedHeaderImage: z.any().optional(),
    encodedLogo: z.any().optional(),
    name: z
      .string()
      .regex(/^[a-zA-Z-_ ]*$/, "Please enter a valid name.")
      .min(1, "Please enter the Organisation name.")
      .trim(),
    phoneNumber: z
      .string()
      .regex(/^\+?[0-9]*$/, "Please enter a valid contact number.")
      .refine(
        (value) => {
          return isValidPhoneNumberForCountry(value, "AU");
        },
        { message: "Please enter a valid contact number." }
      ),
    websiteURL: z
      .union([
        z.literal(""),
        z
          .string()
          .transform(addProtocolIfMissing)
          .pipe(z.string().url("Please enter a valid website URL."))
      ])
      .refine(
        (value) => {
          if (value.length > 0) {
            return validator.isURL(value);
          }

          return true;
        },
        { message: "Please enter a valid website URL." }
      )
      .transform((str) => (!str ? null : str)),
    email: z
      .string()
      .min(1, "Please provide an email address.")
      .email("Please enter a valid email address."),
    companyTypes: z.string().array().min(1, "Please select a company type."),
    type: z.string().min(1, "Please select a type.").optional(),
    abn: z.string().optional(),
    acn: z.string().optional()
  })
  .refine(
    ({ encodedHeaderImage }) => {
      return (
        !encodedHeaderImage ||
        (encodedHeaderImage &&
          ACCEPTED_IMAGE_TYPES.includes(encodedHeaderImage.type))
      );
    },
    {
      message: "Cover image must be in .jpg, .svg, or .png format.",
      path: ["encodedHeaderImage"]
    }
  )
  .refine(
    ({ encodedLogo }) => {
      return (
        !encodedLogo ||
        (!!encodedLogo && ACCEPTED_IMAGE_TYPES.includes(encodedLogo.type))
      );
    },
    {
      message: "Logo image must be in .jpg, .svg, or .png format.",
      path: ["encodedLogo"]
    }
  )
  .refine(
    ({ type, abn }) => {
      if (type === "abn") {
        return !!abn;
      }
      return true;
    },
    {
      message: "Please enter an ABN.",
      path: ["abn"]
    }
  )
  .refine(
    ({ type, acn }) => {
      if (type === "acn") {
        return !!acn;
      }
      return true;
    },
    {
      message: "Please enter an ACN.",
      path: ["acn"]
    }
  )
  .refine(
    ({ acn, type }) => {
      if (!!acn?.length && type === "acn") {
        return isValidACN(acn);
      }
      return true;
    },
    {
      message: "Please enter a valid ACN.",
      path: ["acn"]
    }
  )
  .refine(
    ({ abn, type }) => {
      if (!!abn?.length && type === "abn") {
        return isValidABN(abn);
      }
      return true;
    },
    {
      message: "Please enter a valid ABN.",
      path: ["abn"]
    }
  );

export const addTeamMemberSchema = z
  .object({
    isAdmin: z.boolean().default(false),
    encodedProfileImage: z.any().optional(),
    firstName: z
      .string()
      .trim()
      .min(1, "Please enter first name.")
      .max(100)
      .trim()
      .nonempty("Please enter first name.")
      .refine(
        (value) => {
          const regex1 = /^[a-zA-Z-']*$/; // REGEX allows only for Alphabet
          if (value === "") {
            return true;
          } else if (!value.match(regex1)) {
            return false;
          } else {
            return true;
          }
        },
        { message: "Only Alphabet allowed." }
      ),
    lastName: z
      .string()
      .trim()
      .min(1, "Please enter last name.")
      .max(100)
      .trim()
      .nonempty("Please enter last name.")
      .refine(
        (value) => {
          const regex1 = /^[a-zA-Z-']*$/; // REGEX allows only for Alphabet
          if (value === "") {
            return true;
          } else if (!value.match(regex1)) {
            return false;
          } else {
            return true;
          }
        },
        { message: "Please enter only alphabetical characters." }
      ),
    email: z
      .string()
      .min(1, "Please enter email address.")
      .email("Please enter a valid email address."),
    designation: z
      .string()
      .trim()
      .min(1, "Please enter designation.")
      .trim()
      .nonempty("Please enter designation.")
      .refine(
        (value) => {
          const regex1 = /^[a-zA-Z_ -]*$/; // Allowed only for the space underscore, space and hyphen allowed
          if (value === "") {
            return true;
          } else if (!value.match(regex1)) {
            return false;
          } else {
            return true;
          }
        },
        { message: "Only underscore, space and hyphens are allowed." }
      )
  })
  .refine(
    ({ encodedProfileImage }) => {
      if (!encodedProfileImage) return true;
      return (
        encodedProfileImage &&
        ACCEPTED_IMAGE_TYPES.includes(encodedProfileImage.type)
      );
    },
    {
      message: "Only .jpg and .png formats are supported.",
      path: ["encodedProfileImage"]
    }
  );

const baseJobListingSchema = z
  .object({
    jobId: z.string().optional(),
    isAdvert: z.boolean().default(false),
    websiteLink: z
      .union([
        z.literal(""),
        z
          .string()
          .transform(addProtocolIfMissing)
          .pipe(z.string().url("Please enter a valid website URL."))
      ])
      .refine(
        (value) => {
          if (value.length > 0) {
            return validator.isURL(value);
          }

          return true;
        },
        { message: "Please enter a valid website URL." }
      )

      .transform((str) => (!str ? null : str))
      .optional(),
    forProfession: z.string().min(1, "Profession is required."),
    jobTitle: z
      .string()
      .trim()
      .min(1, "Job title is required.")
      .max(255, "Job title character limit exceeded.")
      .regex(/^[a-zA-Z&/()\- ]+$/, "Invalid characters in job title."),
    areasOfLaw: z.array(z.string()).optional(),
    areasOfSpecialization: z.array(z.string()).optional(),
    areasOfSpecializationParalegal: z.array(z.string()).optional(),
    minSalary: z.coerce.number().optional().nullable(),
    maxSalary: z.coerce.number().optional().nullable(),
    isSalaryVisible: z.boolean(),
    isSalaryNegotiable: z.boolean(),
    workModes: z.array(z.string()).min(1, "Please select a work mode."),
    workCommitments: z
      .array(z.string())
      .min(1, "Please select a work commitment."),
    expectedMinPqe: z
      .string()
      .min(1, "Expected minimum PQE is required.")
      .regex(/^\d+$/, "Invalid PQE value.")
      .transform(Number)
      .optional()
      .nullable(),
    expectedMaxPqe: z
      .string()
      .min(1, "Expected maximum PQE is required.")
      .regex(/^\d+$/, "Invalid PQE value.")
      .transform(Number)
      .optional()
      .nullable(),
    expectedDegreeTypes: z.array(z.string()).optional(),
    workedFor: z.array(z.string()).min(1, "Worked for is required."),
    yearsOfExp: z.string().optional().nullable(),
    doesSponsor: z.boolean().default(false),
    roleDescription: z.string().min(1, "Role description is required."),
    assignedTeamMembers: z.array(z.string()).optional(),
    jobLocation: z.string().min(1, "Job location is required.")
  })
  .superRefine((values, ctx) => {
    if (values.isAdvert && !values.websiteLink) {
      ctx.addIssue({
        message: "Website link is required.",
        code: z.ZodIssueCode.custom,
        path: ["websiteLink"]
      });
    }
  });

export const createJobListingSchema = (
  professions,
  minPQE,
  maxPQE,
  jobData,
  length
) => {
  return baseJobListingSchema.superRefine((values, ctx) => {
    const {
      forProfession,
      maxSalary,
      minSalary,
      areasOfSpecialization,
      expectedMinPqe,
      expectedMaxPqe,
      expectedDegreeTypes,
      areasOfLaw,
      yearsOfExp
    } = values;
    const profession = professions.find(
      (p) => p.id === forProfession
    ).profession;
    if (length > 6000) {
      ctx.addIssue({
        message: `Role description allowed character limit is 6000, currently contains ${length} characters.`,
        code: z.ZodIssueCode.custom,
        path: ["roleDescription"]
      });
    }

    if (maxSalary && minSalary && minSalary > maxSalary) {
      ctx.addIssue({
        message: "Minimum salary cannot be higher than maximum salary.",
        code: z.ZodIssueCode.custom,
        path: ["minSalary"]
      });
    }
    if (maxSalary && minSalary && minSalary > maxSalary) {
      ctx.addIssue({
        message: "Maximum salary cannot be lower than minimum salary.",
        code: z.ZodIssueCode.custom,
        path: ["maxSalary"]
      });
    }
    if (minSalary === 1 && maxSalary === 0) {
      ctx.addIssue({
        message: "Minimum salary cannot be higher than maximum salary.",
        code: z.ZodIssueCode.custom,
        path: ["maxSalary"]
      });
    }

    if (
      typeof minSalary === "number" &&
      typeof maxSalary === "number" &&
      minSalary === maxSalary &&
      minSalary !== 0 &&
      maxSalary !== 0
    ) {
      ctx.addIssue({
        message: "Maximum salary cannot be same as minimum salary.",
        code: z.ZodIssueCode.custom,
        path: ["maxSalary"]
      });
    }

    if (profession === "Lawyer") {
      if (!areasOfLaw || !areasOfLaw.length) {
        ctx.addIssue({
          message: "Area of law is required.",
          code: z.ZodIssueCode.custom,
          path: ["areasOfLaw"]
        });
      }
      if (!expectedDegreeTypes || !expectedDegreeTypes.length) {
        ctx.addIssue({
          message: "Education is required.",
          code: z.ZodIssueCode.custom,
          path: ["expectedDegreeTypes"]
        });
      }
      if (expectedMaxPqe && expectedMinPqe && expectedMinPqe > expectedMaxPqe) {
        ctx.addIssue({
          message: "Minimum PQE cannot be higher than maximum PQE.",
          code: z.ZodIssueCode.custom,
          path: ["expectedMinPqe"]
        });
      }

      if (jobData) {
        // validate peq values for only activated jobs
        if (!jobData?.isActive) return;

        if (
          expectedMinPqe !== null &&
          expectedMinPqe !== undefined &&
          minPQE !== null &&
          minPQE !== undefined &&
          expectedMinPqe > minPQE
        ) {
          ctx.addIssue({
            message:
              "Expected minimum PQE cannot be higher than the provided minimum PQE.",
            code: z.ZodIssueCode.custom,
            path: ["expectedMinPqe"]
          });
        }
      }
      if (jobData) {
        if (expectedMaxPqe != null && expectedMaxPqe < maxPQE) {
          ctx.addIssue({
            message:
              "Expected maximum PQE entered is lower or equal to the original value.",
            code: z.ZodIssueCode.custom,
            path: ["expectedMaxPqe"]
          });
        }
      }

      if (
        expectedMinPqe == expectedMaxPqe &&
        expectedMinPqe !== null &&
        expectedMaxPqe !== null
      ) {
        ctx.addIssue({
          message: "Maximum PQE cannot be same as minimum PQE.",
          code: z.ZodIssueCode.custom,
          path: ["expectedMaxPqe"]
        });
      }
      if (!expectedMinPqe && expectedMinPqe !== 0) {
        ctx.addIssue({
          message: "Minimum PQE is required.",
          code: z.ZodIssueCode.custom,
          path: ["expectedMinPqe"]
        });
      }
      if (expectedMinPqe && expectedMinPqe > 80) {
        ctx.addIssue({
          message: "Minimum PQE max limit reached.",
          code: z.ZodIssueCode.custom,
          path: ["expectedMinPqe"]
        });
      }
      if (!expectedMaxPqe) {
        ctx.addIssue({
          message: "Maximum PQE is required.",
          code: z.ZodIssueCode.custom,
          path: ["expectedMaxPqe"]
        });
      } else if (expectedMaxPqe > 80) {
        ctx.addIssue({
          message: "Maximum PQE max limit reached.",
          code: z.ZodIssueCode.custom,
          path: ["expectedMaxPqe"]
        });
      }
      // TODO: ADD PQE VALIDATION MIN MAX
      // TODO: ADD SALARY VALIDATION MIN MAX
    } else {
      if (!areasOfSpecialization || !areasOfSpecialization.length) {
        ctx.addIssue({
          message: "Areas of specialialty is required.",
          code: z.ZodIssueCode.custom,
          path: ["areasOfSpecialization"]
        });
      }

      if (!yearsOfExp || !yearsOfExp.length) {
        ctx.addIssue({
          message: "Years of Experience is required.",
          code: z.ZodIssueCode.custom,
          path: ["yearsOfExp"]
        });
      }
    }
  });
};

export const connectionRequestSchema = z.object({
  connectionMessage: z
    .string()
    .max(500, "Connection request message character limit exceeded.")
});

export const messageSchema = z.object({
  message: z.string().max(5000, "Character limit exceeded, max 5000 characters")
});

export const billingAddressSchema = z.object({
  line1: z
    .string()
    .trim()
    .min(1, "Please enter address line 1.")
    .max(100)
    .nonempty("Please enter address line 1.")
    .regex(
      /^(?!.*\*)[a-zA-Z0-9-.,"'()-;:/_& ]+$/,
      "Invalid characters in address line 1."
    ),
  line2: z
    .string()
    .trim()
    .min(1, "Please enter address line 2.")
    .max(100)
    .nonempty("Please enter address line 2.")
    .regex(
      /^(?!.*\*)[a-zA-Z0-9-.,"'()-;:/_& ]+$/,
      "Invalid characters in address line 2."
    ),
  city: z
    .string()
    .trim()
    .min(1, "Please enter a city.")
    .max(100)
    .nonempty("Please enter a city.")
    .regex(
      /^(?!.*\*)[a-zA-Z0-9-.,"'()-;:/_& ]+$/,
      "Invalid characters in city."
    ),
  state: z.string().min(1, "Please select a state."),
  postalCode: z
    .string()
    .trim()
    .min(1, "Please enter the zip code.")
    .max(4, "Invalid zip code entered.")
    .nonempty("Please enter the zip code.")
    .regex(
      /(^0(2|8|9){1}[0-9]{2})$|(^[1-9]{1}[0-9]{3})$/,
      "Invalid zip code entered."
    ),
  country: z.string()
});

export const viewCardSchema = z.object({
  isPaymentExist: z.boolean(),
  isAddCard: z.boolean()
});

export const addNewTeamMemberSchema = z
  .object({
    teamMemberId: z.string().optional(),
    encodedProfileImage: z.any().optional(),
    isAdmin: z.boolean().default(false),
    firstName: z
      .string()
      .trim()
      .min(1, "Please enter first name.")
      .max(100)
      .trim()
      .nonempty("Please enter first name.")
      .refine(
        (value) => {
          const regex1 = /^[a-zA-Z- ']*$/; // REGEX allows only for Alphabet
          if (value === "") {
            return true;
          } else if (!value.match(regex1)) {
            return false;
          } else {
            return true;
          }
        },
        { message: "Please enter only alphabetical characters." }
      ),
    lastName: z
      .string()
      .trim()
      .min(1, "Please enter last name.")
      .max(100)
      .trim()
      .nonempty("Please enter last name.")
      .refine(
        (value) => {
          const regex1 = /^[a-zA-Z-']*$/; // REGEX allows only for Alphabet
          if (value === "") {
            return true;
          } else if (!value.match(regex1)) {
            return false;
          } else {
            return true;
          }
        },
        { message: "Please enter only alphabetical characters." }
      ),
    email: z
      .string()
      .min(1, "Please enter email address.")
      .email("Please enter a valid email address."),
    designation: z
      .string()
      .trim()
      .min(1, "Please enter designation.")
      .trim()
      .nonempty("Please enter designation.")
      .refine(
        (value) => {
          const regex1 = /^[a-zA-Z_ -]*$/; // Allowed only for the space underscore, space and hyphen allowed
          if (value === "") {
            return true;
          } else if (!value.match(regex1)) {
            return false;
          } else {
            return true;
          }
        },
        { message: "Please enter only alphabetical characters." }
      )
  })
  .refine(
    ({ encodedProfileImage }) => {
      if (!encodedProfileImage) return true;
      return (
        encodedProfileImage &&
        ACCEPTED_IMAGE_TYPES.includes(encodedProfileImage.type)
      );
    },
    {
      message: "Only .jpg and .png formats are supported.",
      path: ["encodedProfileImage"]
    }
  );
