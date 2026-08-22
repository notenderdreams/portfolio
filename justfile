# Justfile for running the static portfolio site

# Default recipe: list available commands
default:
    @just --list

# Start a local network development server accessible from your phone and computer
serve port="8000":
    @python3 -c "import socket; s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); (s.connect(('8.8.8.8', 80)), print('\n' + '='*50 + '\n🚀 Server running!\n💻 Local (Mac):   http://localhost:{{port}}\n📱 Phone (Wi-Fi): http://' + s.getsockname()[0] + ':{{port}}\n' + '='*50 + '\n'), s.close())"
    python3 -m http.server {{port}} --bind 0.0.0.0

# Start the server, open the browser on your Mac, and print phone URL
dev port="8000":
    @python3 -c "import socket; s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); (s.connect(('8.8.8.8', 80)), print('\n' + '='*50 + '\n🚀 Server running!\n💻 Local (Mac):   http://localhost:{{port}}\n📱 Phone (Wi-Fi): http://' + s.getsockname()[0] + ':{{port}}\n' + '='*50 + '\n'), s.close())"
    @open http://localhost:{{port}} || true
    python3 -m http.server {{port}} --bind 0.0.0.0

alias run := dev

# Alternative server using Node/npx serve
serve-node port="8000":
    npx -y serve . -l {{port}}
