import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CustomDeleteButton = ({ handleDelete }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleDelete}
        >
            {isHovered ? <DeleteIcon
                style={{ cursor: 'pointer', color: '#BFC0C0', marginTop: '2px' }}
            /> : <DeleteOutlineIcon
                style={{ cursor: 'pointer', color: '#BFC0C0', marginTop: '2px' }}
            />}
        </div>
    );
};

export default CustomDeleteButton;