import datetime
import subprocess
import re

def get_latest_timestamp():
    try:
        cmd = ["git", "log", "-1", "--format=%cd", "--date=iso-strict"]
        latest_date = subprocess.check_output(cmd).decode("utf-8").strip()
        dt = datetime.datetime.fromisoformat(latest_date)
        return dt.strftime("%Y-%m-%d %H:%M UTC")
    except Exception:
        return datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")

def update_sentinel_svg():
    ts = get_latest_timestamp()
    svg_path = "ethernium-sentinel.svg"
    with open(svg_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace log line
    pattern = r"> SENESCHAL_LOG:.*?</text>"
    replacement = f"> SENESCHAL_LOG [{ts}]: Systemic protocol active. Synchronized with Steve Blackbeard.</text>"
    
    if re.search(pattern, content):
        content = re.sub(pattern, replacement, content)
    else:
        # Fallback if pattern format varies
        content = content.replace("Synchronized with Steve Blackbeard protocol.", f"[{ts}] Synchronized with Steve Blackbeard protocol.")
        
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully updated ethernium-sentinel.svg with pulse timestamp:", ts)

if __name__ == "__main__":
    update_sentinel_svg()
