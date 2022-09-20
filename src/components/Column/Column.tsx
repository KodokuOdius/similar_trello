import React, { DragEvent, useState, ChangeEvent } from "react";
import Button from "@components/Button";

import Ticket from "@components/Ticket";
import { ITicket } from "@components/Ticket/Ticket";
import "./Column.scss";


export interface IColumn {
    id: number,
    order: number,
    title: string,
    tickets: ITicket[]
}

export type ColumnProps = {
    column: IColumn
    onDeleteColumnData: (id: number) => void,
    onAddNewTicket: (columnId: number) => void;
    onDeleteTicketData: (columnId: number, ticketId: number) => void;

    onDragStartColumn: (event: DragEvent<HTMLDivElement>, column: IColumn) => void;
    onDropColumn: (event: DragEvent<HTMLDivElement>, column: IColumn) => void;

    onDropTicket: (event: DragEvent<HTMLDivElement>, column: IColumn, ticket: ITicket) => void;
    onDragStartTicket: (event: DragEvent<HTMLDivElement>, column: IColumn, ticket: ITicket) => void;

    onChangeColumn: (event: ChangeEvent<HTMLInputElement>, column: IColumn) => void;
    onChangeTicket: (event: ChangeEvent<HTMLInputElement>, column: IColumn, ticket: ITicket) => void;
};

const Column: React.FC<ColumnProps> = ({ column, onDeleteColumnData, onAddNewTicket, onDeleteTicketData, onDragStartColumn, onDropColumn, onDragStartTicket, onDropTicket, onChangeTicket, onChangeColumn }) => {

    const onDeleteColumn = (event: React.MouseEvent) => {
        onDeleteColumnData(column.id);
    };

    const onDragEndColumn = (event: DragEvent<HTMLDivElement>) => {
        event.currentTarget.style.backgroundColor = "white";
    };

    const onDragOverColumn = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        // event.currentTarget.style.backgroundColor = "lightgray";
    };
    return (
        <div className="column"
            onDragStart={e => onDragStartColumn(e, column)}
            onDragLeave={e => onDragEndColumn(e)}
            onDragEnd={e => onDragEndColumn(e)}
            onDragOver={e => onDragOverColumn(e)}
            onDrop={e => onDropColumn(e, column)}
            draggable={true}
        >
            <div className="column__header">
                <h2 className="column__title">
                    <input type="text" className="column__title_input" onChange={e => onChangeColumn(e, column)} defaultValue={column.title} />
                </h2>
                <div className="column__control">
                    <Button className="column__delete" onClick={e => onDeleteColumn(e)}>
                        Delete This
                    </Button>
                    <Button className="column__add-ticket" onClick={() => onAddNewTicket(column.id)}>
                        Add Ticket
                    </Button>
                </div>
            </div>
            <div className="tickets">
                {column.tickets.map(ticket => {
                    return <Ticket key={ticket.id}
                        ticket={ticket} column={column}
                        onDeleteTicketData={onDeleteTicketData}
                        onDragStartTicket={onDragStartTicket}
                        onDropTicket={onDropTicket}
                        onChangeTicket={onChangeTicket}
                    />
                })}
            </div>
        </div>
    );
};
export default Column;