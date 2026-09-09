from __future__ import annotations

import os
from pathlib import Path


def promote_output(source_path: str, temporary_path: str, requested_path: str, backup_path: str | None) -> dict:
    source = Path(source_path).resolve()
    temporary = Path(temporary_path).resolve()
    requested = Path(requested_path).resolve()
    backup = Path(backup_path).resolve() if backup_path else None
    if requested == source:
        raise ValueError("Original input must never be overwritten")
    if not temporary.exists():
        raise FileNotFoundError(temporary)
    requested.parent.mkdir(parents=True, exist_ok=True)
    if requested.exists():
        if backup is None:
            raise ValueError("Existing output requires a recoverable backup path")
        if backup.exists():
            raise FileExistsError(backup)
        os.replace(requested, backup)
    try:
        os.replace(temporary, requested)
    except Exception:
        if backup is not None and backup.exists() and not requested.exists():
            os.replace(backup, requested)
        raise
    return {
        "old_output_path": str(requested) if backup is not None else None,
        "current_output_path": str(requested),
        "backup_output_path": str(backup) if backup is not None else None,
    }
