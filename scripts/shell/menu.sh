#!/bin/bash

# set -o errexit # Exit on error

export GIT_VERSION=`node scripts/helpers/version.js`
# echo "DSF version: <$GIT_VERSION>"


# determine the path to this script. it will become the app scripts path path.
#
# the __config directory must live in the same directory as this script for any user overrides to take effect.
SCRIPT_PATH="${BASH_SOURCE[0]}"

# echo "SCRIPT_PATH: ${SCRIPT_PATH}";

if [ -h "${SCRIPT_PATH}" ]; then
    while [ -h "${SCRIPT_PATH}" ]; do
        SCRIPT_PATH=`readlink "${SCRIPT_PATH}"`
    done
fi

pushd . > /dev/null

# echo "SCRIPT_PATH: ${SCRIPT_PATH}";

cd `dirname ${SCRIPT_PATH}` > /dev/null
export SCRIPT_PATH=`pwd`;
export app_scripts_path="${SCRIPT_PATH}"
popd  > /dev/null
export app_scripts_config_path="${app_scripts_path}/_config"



# Adds pretty colours to our menu
source "${app_scripts_config_path}/__colors.sh"


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



declare -a choices

choices[0]="${A}start              ${X}${STYLE_MENU_OPTION} - Start the express/webpack middleware website"${X}
choices[1]="${A}build-site         ${X}${STYLE_MENU_OPTION} - Builds files for the website, outputs to ${STYLE_BRANCH_H1}./build"${X}
choices[2]="${A}clean-build-folder ${X}${STYLE_MENU_OPTION} - Removes the folder ${STYLE_BRANCH_H1}./build${STYLE_MENU_OPTION} and its contents"${X}
choices[3]="${A}build-dist         ${X}${STYLE_MENU_OPTION} - Runs the distribution config webpack, builds to ${STYLE_BRANCH_H1}.tmp/${STYLE_MENU_OPTION} directory...
                                  -  packages it up in ${STYLE_BRANCH_H1}.dist/${STYLE_MENU_OPTION}
                                  -  creates a ${STYLE_MENU_OPTION_BRIGHT}.zip${STYLE_MENU_OPTION} file intended for downloading from the website
                                  -  also creates a ${STYLE_MENU_OPTION_BRIGHT}README.md${STYLE_MENU_OPTION} specifically made for the downloadable bundle"${X}
choices[4]="${A}build-dist-for-npm ${X}${STYLE_MENU_OPTION} - Just like build-dist except that it does not create the .zip file
                                  and it does include a specialized ${STYLE_MENU_OPTION_BRIGHT}package.json${STYLE_MENU_OPTION} file for the NPM bundle"${X}
choices[5]="${A}test               ${X}${STYLE_MENU_OPTION} - Run the test suite."${X}

echo ${X}

if __menu "${choices[@]}"; then
    case $_menu_sel_index in
        1)
            echo ${I}"Starting up the express/webpack middleware website"${X};
            npm run start;
            echo;;

        2)
            echo "Running production config webpack, outputting files to ${STYLE_BRANCH_H1}./build${X}";
            npm run build-site;
            echo;;

        3)
            echo "Removing the folder ${STYLE_BRANCH_H1}./build${X} and all its contents";
            npm run clean-build-folder;
            echo;;

        4)
            echo "Running distribution config webpack, building to ${STYLE_BRANCH_H1}./.tmp${X} directory and then packaging it up in the ${STYLE_BRANCH_H1}./.dist${X} with a .zip file and README.md${X}";
            npm run build-dist;
            echo;;

        5)
            echo "Running distribution config webpack, building to ${STYLE_BRANCH_H1}./.tmp${X} directory and then packaging it up for uploading to npm in the ${STYLE_BRANCH_H1}./.dist${X}";
            npm run build-dist-for-npm;
            echo;;

        6)
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
