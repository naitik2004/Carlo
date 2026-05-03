output "s3_bucket_name" {
  description = "Application S3 bucket with versioning, encryption, and public access blocked."
  value       = aws_s3_bucket.app.bucket
}

output "ecr_repository_url" {
  description = "URL to push Docker images (without tag)."
  value       = aws_ecr_repository.backend.repository_url
}

output "ecs_cluster_name" {
  description = "ECS cluster hosting the Fargate service."
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "ECS service name for the backend."
  value       = aws_ecs_service.backend.name
}
