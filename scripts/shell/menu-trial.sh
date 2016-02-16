#!/bin/bash

# set -o errexit # Exit on error

export GIT_VERSION=`node scripts/helpers/version.js`
echo "DSF version: <$GIT_VERSION>"


# determine the path to this script. it will become the app scripts path path.
#
# the __config directory must live in the same directory as this script for any user overrides to take effect.
SCRIPT_PATH="${BASH_SOURCE[0]}"
if [ -h "${SCRIPT_PATH}" ]; then
	while [ -h "${SCRIPT_PATH}" ]; do
		SCRIPT_PATH=`readlink "${SCRIPT_PATH}"`
	done
fi
pushd . > /dev/null
cd `dirname ${SCRIPT_PATH}` > /dev/null
export SCRIPT_PATH=`pwd`;
export app_scripts_path="${SCRIPT_PATH}/"
popd  > /dev/null
export app_scripts_config_path="${app_scripts_path}_config/"



# source all functions (including libraries)
fshSourceme="${app_scripts_path}/lib/functionsh/SOURCEME"
source "$fshSourceme" > /dev/null
if ! type -t __source_all &> /dev/null; then
    echo "${E} ERROR: ${X} Unable to load dependency libraries."
    return 4
fi
__source_all -x "${app_scripts_path}/functions"
unset fshSourceme


# set up variables to distinguish environment. thanks functionsh!
__get_env

source "${app_scripts_config_path}__colors.sh"


declare -a choices

choices[0]="${A}start${STYLE_MENU_OPTION} - Start up the website"${X}
choices[2]="${A}site-build${STYLE_MENU_OPTION} - Builds files for the website. Outputs to ${STYLE_BRANCH_H1}./build${STYLE_MENU_OPTION}"${X}
choices[3]="${A}clean-build${STYLE_MENU_OPTION} - Removes the folder ${STYLE_BRANCH_H1}./build${STYLE_MENU_OPTION} and its contents"${X}
choices[5]="${A}dist${STYLE_MENU_OPTION} - Run the distribution config webpack, build to ${STYLE_BRANCH_H1}.tmp/${STYLE_MENU_OPTION} directory and then package it up in ${STYLE_BRANCH_H1}.dist/${STYLE_MENU_OPTION} with a .zip file and README.md"${X}
choices[6]="${A}dist-npm${STYLE_MENU_OPTION} - Run the distribution config webpack, build to ${STYLE_BRANCH_H1}./.tmp${STYLE_MENU_OPTION} directory and then package it up for distribution to NPM in ${STYLE_BRANCH_H1}./.dist${STYLE_MENU_OPTION}"${X}
choices[7]="${A}test${STYLE_MENU_OPTION} - Run the test suite."${X}

if __menu "${choices[@]}"; then
	echo ${X}
	case $_menu_sel_index in
		1)
			echo ${I}"Starting up the website"${X};
			# read commitmessage
			# "${app_scripts_path}"commit.sh "$commitmessage" -a;;
			npm run start;
			echo;;

		2)
			echo "Running production config webpack, outputting files to ${STYLE_BRANCH_H1}./build${X}";
			npm run site-build;
			echo;;

		3)
			echo "Removing the folder ${STYLE_BRANCH_H1}./build${X} and all its contents";
			npm run clean-build;
			echo;;

		5)
			echo "Running distribution config webpack, building to ${STYLE_BRANCH_H1}./.tmp${X} directory and then packaging it up in the ${STYLE_BRANCH_H1}./.dist${X} with a .zip file and README.md${X}";
			npm run dist;
			echo;;

		6)
			echo "Running distribution config webpack, building to ${STYLE_BRANCH_H1}./.tmp${X} directory and then packaging it up for uploading to npm in the ${STYLE_BRANCH_H1}./.dist${X}";
			npm run dist-npm;
			echo;;

		7)
			echo "Running the test suite...${X}";
			npm run test;
			echo;;

		# User aborted
		*)
			echo "Exiting..."
			exit 0;;
	esac
else
	echo
	echo ${E}"  Unable to determine menu choices --- aborting...  "${X}
	exit 1
fi
