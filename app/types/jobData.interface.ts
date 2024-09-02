export interface IJobData {
    apply_options: Array<object>
    employer_company_type: string
    employer_linkedin: string | null
    employer_logo: string
    employer_name: string
    employer_website: string
    job_apply_is_direct: boolean
    job_apply_link: string
    job_apply_quality_score: number
    job_benefits: string[]
    job_city: string
    job_country: string
    job_description: string
    job_employment_type: string
    job_experience_in_place_of_education: boolean
    job_google_link: string
    job_highlights: {
        Benefits: string[]
        Qualifications: string[]
        Responsibilities: string[]
    }
    job_id: string
    job_is_remote: boolean
    job_job_title: string
    job_latitude: number
    job_longitude: number
    job_max_salary: number | null
    job_min_salary: number | null
    job_naics_code: string
    job_naics_name: string
    job_occupational_categories: string | null
    job_offer_expiration_datetime_utc: string
    job_offer_expiration_timestamp: number
    job_onet_job_zone: string
    job_onet_soc: string
    job_posted_at_datetime_utc: string
    job_posted_at_timestamp: number
    job_posting_language: string
    job_publisher: string
    job_required_education: {
        postgraduate_degree: boolean
        professional_certification: boolean
        high_school: boolean
        associates_degree: boolean
        bachelors_degree: boolean
        other: boolean
    }
    job_required_experience: {
        no_experience_required: string
        required_experience_in_months: number | null
        experience_mentioned: string
        experience_preferred: string
    }
    job_required_skills: string | null
    job_salary_currency: string | null
    job_salary_period: string | null
    job_state: string
    job_title: string
}
