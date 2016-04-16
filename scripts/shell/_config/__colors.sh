## /* @config
#	@description
#	Variables are set to general style and color references, and then gitscripts-specific
#	tags are defined. It is not recommended to override the first block of definitions
#	as they are objectively set, but the second and third block of definitions
#	can be overridden in user.overrides to fit your own personal style.
#	description@
#
#	@notes
#	- These variable names are used throughout GitScripts, so changing them
#	will undoubtedly remove a color from somewhere.
#	notes@
#
#	@file scripts/shell/colors.sh
## */



# Bash colors
PRE=$'\033['

# semantic styles and colors
[ -n "${CFG_NORM}" ] 								|| export CFG_NORM=0
[ -n "${CFG_BRIGHT}" ] 								|| export CFG_BRIGHT=1
[ -n "${CFG_DIM}" ] 								|| export CFG_DIM=2
[ -n "${CFG_REVERSE}" ] 							|| export CFG_REVERSE=7
[ -n "${CFG_UNDERSCORE}" ] 							|| export CFG_UNDERSCORE=4
# foreground
[ -n "${CFG_BLACK}" ] 								|| export CFG_BLACK=30
[ -n "${CFG_RED}" ] 								|| export CFG_RED=31
[ -n "${CFG_GREEN}" ] 								|| export CFG_GREEN=32
[ -n "${CFG_YELLOW}" ] 								|| export CFG_YELLOW=33
[ -n "${CFG_BLUE}" ] 								|| export CFG_BLUE=34
[ -n "${CFG_MAGENTA}" ] 							|| export CFG_MAGENTA=35
[ -n "${CFG_CYAN}" ] 								|| export CFG_CYAN=36
[ -n "${CFG_WHITE}" ] 								|| export CFG_WHITE=37
# background
[ -n "${CFG_BG_BLACK}" ] 							|| export CFG_BG_BLACK=40
[ -n "${CFG_BG_RED}" ] 								|| export CFG_BG_RED=41
[ -n "${CFG_BG_GREEN}" ] 							|| export CFG_BG_GREEN=42
[ -n "${CFG_BG_YELLOW}" ] 							|| export CFG_BG_YELLOW=43
[ -n "${CFG_BG_BLUE}" ] 							|| export CFG_BG_BLUE=44
[ -n "${CFG_BG_MAGENTA}" ] 							|| export CFG_BG_MAGENTA=45
[ -n "${CFG_BG_CYAN}" ] 							|| export CFG_BG_CYAN=46
[ -n "${CFG_BG_WHITE}" ] 							|| export CFG_BG_WHITE=47
# styles
[ -n "${STYLE_BRIGHT}" ] 							|| export STYLE_BRIGHT="${PRE}${CFG_BRIGHT}m"
[ -n "${STYLE_NORM}" ] 								|| export STYLE_NORM="${PRE}${CFG_NORM}m"
[ -n "${STYLE_DIM}" ] 								|| export STYLE_DIM="${PRE}${CFG_DIM}m"
[ -n "${STYLE_REVERSE}" ] 							|| export STYLE_REVERSE="${PRE}${CFG_REVERSE}m"
[ -n "${STYLE_UNDERSCORE}" ] 						|| export STYLE_UNDERSCORE="${PRE}${CFG_UNDERSCORE}m"
# colors
[ -n "${COL_RED}" ] 								|| export COL_RED="${PRE}${CFG_RED}m"
[ -n "${COL_GREEN}" ] 								|| export COL_GREEN="${PRE}${CFG_GREEN}m"
[ -n "${COL_YELLOW}" ] 								|| export COL_YELLOW="${PRE}${CFG_YELLOW}m"
[ -n "${COL_BLUE}" ] 								|| export COL_BLUE="${PRE}${CFG_BLUE}m"
[ -n "${COL_MAGENTA}" ] 							|| export COL_MAGENTA="${PRE}${CFG_MAGENTA}m"
[ -n "${COL_CYAN}" ] 								|| export COL_CYAN="${PRE}${CFG_CYAN}m"
[ -n "${COL_WHITE}" ] 								|| export COL_WHITE="${PRE}${CFG_WHITE}m"
[ -n "${COL_NORM}" ] 								|| export COL_NORM="${PRE}${CFG_NORM}m"
# descriptive styles and colors
[ -n "${STYLE_ACTION}" ] 							|| export STYLE_ACTION=${STYLE_NORM}${STYLE_BRIGHT}${COL_MAGENTA}
[ -n "${STYLE_ERROR}" ] 							|| export STYLE_ERROR=${STYLE_NORM}${STYLE_BRIGHT}"${PRE}${CFG_WHITE};${CFG_BG_RED}m"
[ -n "${STYLE_SUCCESS}" ] 							|| export STYLE_SUCCESS=${STYLE_NORM}${STYLE_BRIGHT}"${PRE}${CFG_GREEN};${CFG_BG_BLACK}m"
[ -n "${STYLE_H1}" ] 								|| export STYLE_H1=${STYLE_NORM}"${PRE}${CFG_WHITE};${CFG_BG_GREEN}m"
[ -n "${STYLE_H2}" ] 								|| export STYLE_H2=${STYLE_NORM}${STYLE_BRIGHT}"${PRE}${CFG_BG_BLUE}m"
[ -n "${STYLE_OUTPUT}" ] 							|| export STYLE_OUTPUT=${STYLE_NORM}${STYLE_BRIGHT}${COL_BLUE}
[ -n "${STYLE_INPUT}" ] 							|| export STYLE_INPUT=${STYLE_NORM}${STYLE_BRIGHT}"${PRE}${CFG_WHITE};${CFG_BG_BLUE}m"
[ -n "${STYLE_WARNING}" ] 							|| export STYLE_WARNING=${STYLE_NORM}${STYLE_BRIGHT}"${PRE}${CFG_YELLOW};${CFG_BG_RED}m"
[ -n "${STYLE_QUESTION}" ] 							|| export STYLE_QUESTION=${STYLE_NORM}${STYLE_BRIGHT}
[ -n "${STYLE_NEWBRANCH_H1}" ] 						|| export STYLE_NEWBRANCH_H1=${STYLE_NORM}${STYLE_BRIGHT}${COL_YELLOW}
[ -n "${STYLE_OLDBRANCH_H1}" ] 						|| export STYLE_OLDBRANCH_H1=${STYLE_NORM}${STYLE_BRIGHT}${COL_YELLOW}
[ -n "${STYLE_NEWBRANCH_H2}" ] 						|| export STYLE_NEWBRANCH_H2=${STYLE_NORM}${STYLE_BRIGHT}${COL_YELLOW}
[ -n "${STYLE_OLDBRANCH_H2}" ] 						|| export STYLE_OLDBRANCH_H2=${STYLE_NORM}${STYLE_BRIGHT}${COL_YELLOW}
[ -n "${STYLE_BRANCH_WARNING}" ]    				|| export STYLE_BRANCH_WARNING=${STYLE_NORM}${STYLE_BRIGHT}"${PRE}${CFG_CYAN};${CFG_BG_RED}m"
[ -n "${STYLE_NEWBRANCH_WARNING}" ] 				|| export STYLE_NEWBRANCH_WARNING=${STYLE_NORM}${STYLE_BRIGHT}${COL_YELLOW}
[ -n "${STYLE_OLDBRANCH_WARNING}" ] 				|| export STYLE_OLDBRANCH_WARNING=${STYLE_NORM}${STYLE_BRIGHT}${COL_YELLOW}
[ -n "${STYLE_OLDBRANCH}" ] 						|| export STYLE_OLDBRANCH=${STYLE_NORM}${COL_RED}
[ -n "${STYLE_NEWBRANCH}" ] 						|| export STYLE_NEWBRANCH=${STYLE_NORM}${COL_RED}
[ -n "${STYLE_BRANCH}" ] 							|| export STYLE_BRANCH=${STYLE_NORM}${COL_CYAN}
[ -n "${STYLE_BRANCH_H1}" ] 						|| export STYLE_BRANCH_H1=${STYLE_NORM}${STYLE_BRIGHT}${COL_YELLOW}
[ -n "${STYLE_BRANCH_H2}" ] 						|| export STYLE_BRANCH_H2=${STYLE_NORM}${STYLE_BRIGHT}${COL_YELLOW}
# for __parse_git_branch_state
[ -n "${STYLE_AHEAD}" ] 							|| export STYLE_AHEAD=${STYLE_NORM}"${PRE}${CFG_BLACK};${CFG_BG_YELLOW}m"
[ -n "${STYLE_NO_REMOTE}" ] 						|| export STYLE_NO_REMOTE=${STYLE_NORM}"${PRE}${CFG_BLACK};${CFG_BG_YELLOW}m"
[ -n "${STYLE_BEHIND}" ] 							|| export STYLE_BEHIND=${STYLE_NORM}${STYLE_BRIGHT}"${PRE}${CFG_YELLOW};${CFG_BG_GREEN}m"
[ -n "${STYLE_DELETEDFILE}" ] 						|| export STYLE_DELETEDFILE=${STYLE_NORM}${STYLE_BRIGHT}${COL_RED}
[ -n "${STYLE_DIRTY}" ] 							|| export STYLE_DIRTY=${STYLE_NORM}${STYLE_BRIGHT}"${PRE}${CFG_GRAY};${CFG_BG_RED}m"
[ -n "${STYLE_MODIFIED}" ] 							|| export STYLE_MODIFIED=${STYLE_NORM}${STYLE_BRIGHT}${COL_YELLOW}
[ -n "${STYLE_NEWFILE}" ] 							|| export STYLE_NEWFILE=${STYLE_NORM}${STYLE_BRIGHT}"${PRE}${CFG_WHITE};${CFG_BG_GREEN}m"
[ -n "${STYLE_RENAMEDFILE}" ] 						|| export STYLE_RENAMEDFILE=${STYLE_NORM}${STYLE_BRIGHT}"${PRE}${CFG_WHITE};${CFG_BG_BLUE}m"
[ -n "${STYLE_STAGED}" ] 							|| export STYLE_STAGED=${STYLE_NORM}${STYLE_BRIGHT}${COL_GREEN}
[ -n "${STYLE_UNTRACKED}" ] 						|| export STYLE_UNTRACKED=${STYLE_NORM}${STYLE_BRIGHT}"${PRE}${CFG_RED};${CFG_BG_WHITE}m"
# shortcut styles for above
[ -n "${H1}" ] 										|| export H1=${STYLE_H1}
[ -n "${H1B}" ] 									|| export H1B=${STYLE_BRANCH_H1}
[ -n "${H2}" ] 										|| export H2=${STYLE_H2}
[ -n "${H2B}" ] 									|| export H2B=${STYLE_BRANCH_H2}
[ -n "${WB}" ] 									    || export WB=${STYLE_BRANCH_WARNING}
[ -n "${A}" ] 										|| export A=${STYLE_ACTION}
[ -n "${B}" ] 										|| export B=${STYLE_BRANCH}
[ -n "${E}" ] 										|| export E=${STYLE_ERROR}
[ -n "${S}" ] 										|| export S=${STYLE_SUCCESS}
[ -n "${I}" ] 										|| export I=${STYLE_INPUT}
[ -n "${O}" ] 										|| export O=${STYLE_OUTPUT}
[ -n "${Q}" ] 										|| export Q=${STYLE_QUESTION}
[ -n "${W}" ] 										|| export W=${STYLE_WARNING}
[ -n "${X}" ] 										|| export X=${STYLE_NORM}
# for GitScripts-generated menus
[ -n "${STYLE_MENU_HL}" ] 							|| export STYLE_MENU_HL=${STYLE_NORM}${STYLE_BRIGHT}${COL_BLUE}
[ -n "${STYLE_MENU_HEADER}" ] 						|| export STYLE_MENU_HEADER=${STYLE_NORM}${STYLE_BRIGHT}${COL_BLUE}
[ -n "${STYLE_MENU_INDEX}" ] 						|| export STYLE_MENU_INDEX=${STYLE_NORM}${STYLE_BRIGHT}${COL_YELLOW}
[ -n "${STYLE_MENU_OPTION}" ] 						|| export STYLE_MENU_OPTION=${STYLE_NORM}${COL_CYAN}
[ -n "${STYLE_MENU_OPTION_BRIGHT}" ] 				|| export STYLE_MENU_OPTION_BRIGHT=${STYLE_BRIGHT}${COL_CYAN}
[ -n "${STYLE_MENU_PROMPT}" ] 						|| export STYLE_MENU_PROMPT=${STYLE_NORM}${STYLE_BRIGHT}${COL_YELLOW}
# gitscripts-specific targeted styles
# and colors
#
# if you like the format of the command
# prompt but not the colors themselves,
# override
[ -n "${STYLE_PROMPT_DATE}" ] 						|| export STYLE_PROMPT_DATE=${STYLE_BRIGHT}${COL_BLUE}
[ -n "${STYLE_PROMPT_PATH}" ] 						|| export STYLE_PROMPT_PATH=${COL_CYAN}
[ -n "${STYLE_PROMPT_PATH_BRANCH}" ] 				|| export STYLE_PROMPT_PATH_BRANCH=${COL_GREEN}
[ -n "${STYLE_PROMPT_BRANCH}" ] 					|| export STYLE_PROMPT_BRANCH=${STYLE_BRIGHT}"${PRE}${CFG_MAGENTA}m"
[ -n "${STYLE_PROMPT_USER}" ] 						|| export STYLE_PROMPT_USER=${COL_RED}

#[ -n "${}" ] || export
