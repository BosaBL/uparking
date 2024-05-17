import subprocess
import pathlib


def main():
    SRC_PATH = pathlib.Path().cwd()
    out = subprocess.run(
        [
            "poetry",
            "export",
            "-f",
            "requirements.txt",
            "--output",
            "requirements.txt",
            "--without-hashes",
        ],
        cwd=SRC_PATH,
    )
    exit(0)


if __name__ == "__main__":
    main()
