import subprocess
import pathlib


def main():
    BASE_PATH = pathlib.Path().cwd()
    SRC_PATH = BASE_PATH / "src"
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
