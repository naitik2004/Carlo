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

variable "existing_ecs_execution_role_arn" {
  description = <<-EOT
    If set (required in AWS Academy / learner labs that block iam:CreateRole), Terraform skips
    creating an execution role and uses this ARN instead. Must trust ecs-tasks.amazonaws.com and
    include AmazonECSTaskExecutionRolePolicy (or equivalent) for ECR pull and CloudWatch logs.
  EOT
  type        = string
  default     = ""
}

variable "existing_ecs_task_role_arn" {
  description = <<-EOT
    Optional task role ARN when using existing_ecs_execution_role_arn. Leave empty if the app
    does not need AWS API access from the container (no task role).
  EOT
  type        = string
  default     = ""
}
