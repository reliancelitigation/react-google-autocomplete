#!/usr/bin/env node
// Node 20/22/24 + Yarn 1
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const DOMAIN = process.env.CA_DOMAIN || "reliance-crm-main-us-west-2";
const OWNER = process.env.CA_OWNER || "719580023722";
const REPO = process.env.CA_REPO || "main";
const REGION =
    process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "us-west-2";

function sh(...a) {
    return execFileSync(a[0], a.slice(1), {
        stdio: ["ignore", "pipe", "inherit"],
    })
        .toString()
        .trim();
}

const endpoint = sh(
    "aws",
    "codeartifact",
    "get-repository-endpoint",
    "--domain",
    DOMAIN,
    "--domain-owner",
    OWNER,
    "--repository",
    REPO,
    "--format",
    "npm",
    "--region",
    REGION,
    "--query",
    "repositoryEndpoint",
    "--output",
    "text"
);
if (!endpoint) throw new Error("Empty repositoryEndpoint");

const token = (
    process.env.CODEARTIFACT_AUTH_TOKEN ||
    sh(
        "aws",
        "codeartifact",
        "get-authorization-token",
        "--domain",
        DOMAIN,
        "--domain-owner",
        OWNER,
        "--region",
        REGION,
        "--query",
        "authorizationToken",
        "--output",
        "text"
    )
).trim();
if (!token) throw new Error("Empty authorizationToken");

const host = new URL(endpoint).host;

const npmrc = [
    `registry=${endpoint}`,
    "always-auth=true",
    `//${host}:_authToken=${token}`,
    `//${host}/:_authToken=${token}`,
    `//${host}/npm/${REPO}:_authToken=${token}`,
    `//${host}/npm/${REPO}/:_authToken=${token}`,
    `//${host}:always-auth=true`,
    `//${host}/:always-auth=true`,
    `//${host}/npm/${REPO}:always-auth=true`,
    `//${host}/npm/${REPO}/:always-auth=true`,
    "",
].join("\n");

fs.writeFileSync(path.join(process.cwd(), ".npmrc"), npmrc, "utf8");
console.log("Project .npmrc rewritten.");
console.log("endpoint:", endpoint);
