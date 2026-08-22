# Justfile for running the static portfolio site

# Default recipe: list available commands
default:
    @just --list

# Start a local development server on port 8000 (using Python 3)
serve port="8000":
    @echo "Starting local server at http://localhost:{{port}}..."
    python3 -m http.server {{port}}

# Start the server and open the browser automatically (macOS)
dev port="8000":
    @echo "Opening http://localhost:{{port}} in default browser..."
    @open http://localhost:{{port}} || true
    python3 -m http.server {{port}}

alias run := dev

# Alternative server using Node/npx serve (if node is preferred)
serve-node port="8000":
    npx -y serve . -l {{port}}
