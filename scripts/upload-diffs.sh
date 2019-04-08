#!/usr/bin/env bash

shopt -s nullglob # ignore empty directories

STARTING_DIR=$(pwd)
UPLOAD_MAX=3
UPLOADS=0

function uploadDiffs() {
	DIRECTORY=( "$@" )
	if [ -d "$DIRECTORY" ]; then
		cd "${DIRECTORY}"

		for file in *.png
		do
			if (($UPLOADS < $UPLOAD_MAX)); then
				# echo "$file"
				echo
				echo "curl --upload-file $file -H \"Max-Days: 1\" https://transfer.sh/$file"
				curl --upload-file $file https://transfer.sh/$file
				UPLOADS=$((UPLOADS+1))
			else
				echo
				echo "max uploads set to $UPLOAD_MAX. Skipping uploading $file"
			fi
		done
		echo
		cd "${STARTING_DIR}"
	fi
}

declare -a DIRECTORIES=(
	"/home/travis/build/salesforce/design-system-react/tests/__image_snapshots__/__diff_output__/"
)

for DIRECTORY in "${DIRECTORIES[@]}"
do
	uploadDiffs "${DIRECTORY}"
done

shopt -u nullglob # revert nullglob back to it's normal default state
