# Troubleshooting npm install Issues

## Permission Errors (EPERM)

If you encounter permission errors during `npm install` on Windows:

### Solution 1: Run PowerShell as Administrator
1. Close your current terminal
2. Right-click PowerShell/Command Prompt
3. Select "Run as Administrator"
4. Navigate to project directory: `cd E:\alexUS`
5. Run: `npm install`

### Solution 2: Clean Install
```powershell
# Remove node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# Clear npm cache
npm cache clean --force

# Try install again
npm install
```

### Solution 3: Close Locking Processes
- Close any IDEs (VS Code, Cursor) that might have the folder open
- Close any file explorers showing the project directory
- Disable antivirus temporarily (if safe to do so)
- Try install again

### Solution 4: Use npm ci (if package-lock.json exists)
```powershell
npm ci
```

## Deprecation Warnings

The deprecation warnings are non-critical and won't prevent the app from running. They're from transitive dependencies. You can safely ignore them for now.

## Alternative: Use yarn

If npm continues to have issues:

```powershell
# Install yarn globally (if not already installed)
npm install -g yarn

# Install dependencies with yarn
yarn install
```
