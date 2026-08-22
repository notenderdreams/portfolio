# Justfile for notenderdreams (React + Vite + Bun)

# Default recipe: list available commands
default:
    @just --list

# Install project dependencies with bun
install:
    bun install

# Start local and network dev server with bun (accessible on Mac and Phone)
dev port="8000":
    @python3 -c "import socket; s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); (s.connect(('8.8.8.8', 80)), print('\n' + '='*50 + '\n🚀 notenderdreams running with bun!\n💻 Local (Mac):   http://localhost:{{port}}\n📱 Phone (Wi-Fi): http://' + s.getsockname()[0] + ':{{port}}\n' + '='*50 + '\n'), s.close())"
    bun run dev --port {{port}}

alias run := dev

# Build production bundle with bun
build:
    bun run build

# Preview production build locally and on network
preview port="8000":
    bun run preview --port {{port}}
