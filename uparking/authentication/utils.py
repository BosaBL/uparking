import re
from .exceptions import InvalidRUTException


def check_rut(rut: str, dv: str) -> None:
    """
    Verifica si un RUT es válido, en caso de ser inválido, lanza una excepción.
    Args:
        rut (str): RUT a verificar (sin digito verificador).
        b (str): Dígito verificador.
    """

    dv_int: int
    dv = str(dv).lower()

    PATTERN = r"^([1-9]|[1-9]\d|[1-9]\d{2})((\.\d{3})*|(\d{3})*)\-(\d|k|K)$"

    VDIGIT = {"k": 10, "0": 11}

    if not re.match(PATTERN, f"{rut}-{dv}"):
        raise InvalidRUTException("RUT inválido.")

    if dv in VDIGIT:
        dv_int = VDIGIT[dv]
    else:
        dv_int = int(dv)

    seq = 2
    sum = 0

    for num in reversed(rut):
        sum += int(num) * seq

        if seq % 7 == 0:
            seq = 2
        else:
            seq += 1

    dv_calculado = 11 - (sum % 11)

    if not dv_calculado == dv_int:
        raise InvalidRUTException("RUT inválido.")
