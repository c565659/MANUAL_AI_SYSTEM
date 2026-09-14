from __future__ import annotations


def close_owned_document(document, opened_by_executor: bool) -> bool:
    """Close only the document acquired by this executor invocation."""
    if document is None or not opened_by_executor:
        return False
    document.close(save=False)
    return True
