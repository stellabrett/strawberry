# Backend

This directory is reserved for potential future backend services.

## Current Status

**Strawberry currently operates as a client-side only application with no backend.**

All data is stored locally in the user's browser using IndexedDB, maintaining our privacy-first principles.

## Future Considerations

This directory is included for potential future optional backend features that would not compromise user privacy:

- **Optional Cloud Backup**: End-to-end encrypted backups (user-controlled)
- **Static Hosting**: CDN configuration for PWA delivery

Any future backend implementation must adhere to these principles:
- User data remains encrypted or local-only
- No personally identifiable information stored
- All features remain fully functional without backend
- Backend services are optional enhancements only
