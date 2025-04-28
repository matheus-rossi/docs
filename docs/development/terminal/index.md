# Terminal

## Terminal Emulators

### Ghostty (macOS)

Download: [Link](https://ghostty.org/)

```
background = #000000
foreground = #CDCDCD
selection-background = #68C269
cursor-style = bar
theme=Dark+
macos-titlebar-style = tabs
working-directory = home
window-inherit-font-size = false
quick-terminal-position = bottom
background-opacity = 0.9
font-size = 20
maximize = true
```
### Wezterm (Linux/macOS)

Download: [Link](https://wezfurlong.org/wezterm/index.html)

```
-- Pull in the wezterm API
local wezterm = require("wezterm")

-- This will hold the configuration.
local config = wezterm.config_builder()

-- This is where you actually apply your config choices

-- For example, changing the color scheme:
config.colors = {
	foreground = "#CBE0F0",
	background = "#011423",
	cursor_bg = "#47FF9C",
	cursor_border = "#47FF9C",
	cursor_fg = "#011423",
	selection_bg = "#706b4e",
	selection_fg = "#f3d9c4",
	ansi = { "#214969", "#E52E2E", "#44FFB1", "#FFE073", "#0FC5ED", "#a277ff", "#24EAF7", "#24EAF7" },
	brights = { "#214969", "#E52E2E", "#44FFB1", "#FFE073", "#A277FF", "#a277ff", "#24EAF7", "#24EAF7" },
}

config.font = wezterm.font("MesloLGS NF")
config.font_size = 19

config.enable_tab_bar = false

config.window_decorations = "RESIZE"
config.window_background_opacity = 0.8
config.macos_window_background_blur = 7

config.keys = {
  -- Turn off the default CMD-m Hide action, allowing CMD-m to
  -- be potentially recognized and handled by the tab
  {
    key = 'm',
    mods = 'CMD',
    action = wezterm.action.DisableDefaultAssignment,
  },
}

-- and finally, return the configuration to wezterm
return config
```


## Terminal Tools

My favorite terminal tools

### Better terminal commands
- **bat**
  - Beautiful `cat` commands
  - Download: [Link](https://github.com/sharkdp/bat)
- **eza**
  - Better `ls` commands
  - Download: [Link](https://github.com/eza-community/eza)

### Container / K8s

- **lazydocker**
  - TUI for Docker
  - Download: [Link](https://github.com/jesseduffield/lazydocker)

- **ctop**
  - TUI (btop for containers)
  - Download: [Link](https://github.com/bcicen/ctop)

- **k9s**
  - TUI for K8s
  - Download: [Link](https://github.com/derailed/k9s)

- **kubectl**
  - CLI for K8s
  - Download: [Link](https://kubernetes.io/docs/reference/kubectl/)

### System

- **btop**
  - TUI for system monitoring
  - Download: [Link](https://github.com/aristocratos/btop)

- **dua**
  - Disk Usage Analyzer
  - Download: [Link](https://github.com/Byron/dua-cli)
  - Interactive mode: `dua i`

### Fancy Stuff

- **presenterm**
  - Presenterm is a terminal-based presentation tool that allows you to create and deliver presentations from the command line.
  - Download: [Link](https://github.com/mfontanini/presenterm)

- **jq**
  - JSON processor and formatter
  - Download: [Link](https://github.com/stedolan/jq)

- **macchina**
  - System information tool
  - Download: [Link](https://github.com/Macchina-CLI/macchina)
