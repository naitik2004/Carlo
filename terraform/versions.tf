terraform {
  required_version = ">= 1.6"

  # State must persist between GitHub Actions runs (ephemeral runners). Configure
  # bucket/key/region via: terraform init -backend-config=...
  backend "s3" {}

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
}
