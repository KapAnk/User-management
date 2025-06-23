import UserTable from "../components/UserTable";
import type { User } from "../types/User"
import{render,screen,fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom';

describe('UserTable',()=>{
    const mockUsers: User[] =[
        {
            id:'1',
            name: 'John',
            surname: 'Doe',
            email : 'jd@example.com',
            company: 'Acme corp',
            jobTitle: 'Developer'

        },
        {
            id:'2',
            name: 'Jane',
            surname: 'Smith',
            email : 'jsmith@example.com',
            company: 'Beta Inc',
            jobTitle: 'Manager'
        }
    ];

    const mockOnEdit = jest.fn();

    beforeEach(()=>{
        mockOnEdit.mockClear();
    });

    it('renders table headers correctly', ()=>{
        render(<UserTable users={[]} onEdit={mockOnEdit}/>)
        expect(screen.getByText('UUID')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Surname')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('renders user rows correctly', ()=>{
        render(<UserTable users={mockUsers} onEdit={mockOnEdit}/>)
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Doe')).toBeInTheDocument();
        expect(screen.getByText('jd@example.com')).toBeInTheDocument();
        expect(screen.getByText('Jane')).toBeInTheDocument();
        expect(screen.getByText('Smith')).toBeInTheDocument();
        expect(screen.getByText('jsmith@example.com')).toBeInTheDocument();
    });

    it('calls onEdit with correct user when row is clicked', ()=>{
        render(<UserTable users={mockUsers} onEdit={mockOnEdit}/>)
        const johnRow = screen.getByText('John').closest('tr');
        const janeRow = screen.getByText('Jane').closest('tr');
        fireEvent.click(johnRow!);
        expect(mockOnEdit).toHaveBeenCalledWith(mockUsers[0]);
        fireEvent.click(janeRow!);
        expect(mockOnEdit).toHaveBeenCalledWith(mockUsers[1]);
        expect(mockOnEdit).toHaveBeenCalledTimes(2);
    });

    it('renders no rows when users array is empty', ()=>{
        render(<UserTable users={[]} onEdit={mockOnEdit}/>)
        // Only header row should exist
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBe(1);
    });
});