import { FaUserIcon } from 'smarthr-ui';

interface AvatarIconProps {
  src?: string;
  alt?: string;
}

export const AvatarIcon = ({ src, alt }: AvatarIconProps) => {
  const containerStyle = {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  };

  if (src) {
    return (
      <div style={containerStyle}>
        <img
          src={src}
          alt={alt || ''}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <FaUserIcon />
    </div>
  );
};
