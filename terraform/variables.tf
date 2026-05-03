variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Short project prefix used for resource names."
  type        = string
  default     = "carlo"
}

variable "mongo_uri" {
  description = "MongoDB connection string for the backend container."
  type        = string
  sensitive   = true
  default     = ""
}

variable "jwt_secret" {
  description = "JWT signing secret for the backend container."
  type        = string
  sensitive   = true
  default     = "change-me-in-production"
}
