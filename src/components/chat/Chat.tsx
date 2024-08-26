import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import "./chat.scss";

const messages = [
	{sender: "Anil", text: "Hey There!", time: "Today, 8.30pm"},
	{sender: "Anil", text: "How are you?", time: "Today, 8.33pm"},
	{
		sender: "You",
		text: "I am fine and how are you?",
		time: "Today, 8.34pm",
	},
	{
		sender: "Anil",
		text: "I am doing well, Can we meet tomorrow?",
		time: "Today, 8.36pm",
	},
	{sender: "You", text: "Yes Sure!", time: "Today, 8.58pm"},
	{
		sender: "You",
		text: "I am fine and how are you?",
		time: "Today, 8.34pm",
	},
	{
		sender: "Anil",
		text: "I am doing well, Can we meet tomorrow?",
		time: "Today, 8.36pm",
	},
	{sender: "You", text: "Yes Sure!", time: "Today, 8.58pm"},
];

const chats = [
	{
		name: "Anil",
		message: "April fool’s day",
		time: "Today, 9.52pm",
		unread: 0,
		avatar: "src/resources/img/avatar.png",
	},
	{
		name: "Chuuthiya",
		message: "Baag",
		time: "Today, 12.11pm",
		unread: 1,
		avatar: "src/resources/img/avatar.png",
	},
	{
		name: "Mary ma’am",
		message: "You have to report it...",
		time: "Today, 2.40pm",
		unread: 1,
		avatar: "src/resources/img/avatar.png",
	},
	{
		name: "Bill Gates",
		message: "Nevermind bro",
		time: "Yesterday, 12.31pm",
		unread: 5,
		avatar: "src/resources/img/avatar.png",
	},
	{
		name: "Victoria H",
		message: "Okay, brother. let’s see...",
		time: "Wednesday, 11.12am",
		unread: 0,
		avatar: "src/resources/img/avatar.png",
	},
	{
		name: "Mary ma’am",
		message: "You have to report it...",
		time: "Today, 2.40pm",
		unread: 1,
		avatar: "src/resources/img/avatar.png",
	},
	{
		name: "Bill Gates",
		message: "Nevermind bro",
		time: "Yesterday, 12.31pm",
		unread: 5,
		avatar: "src/resources/img/avatar.png",
	},
	{
		name: "Victoria H",
		message: "seefdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfdf.",
		time: "Wednesday, 11.12am",
		unread: 100,
		avatar: "src/resources/img/avatar.png",
	},
];

interface Ichats {
	name: string;
	message: string;
	time: string;
	unread: number;
	avatar: string;
}

const Chat = () => {
	const ChatPanel = (chats: Ichats[]) => {
		return (
			<div className='chat-list'>
				{chats.map((chat: Ichats, index: number) => (
					<div className='chat-list__item' key={index}>
						<Avatar
							alt={chat.name}
							src={chat.avatar}
							className='chat-list__item__avatar'
						/>
						<div className='chat-list__item__info'>
							<span className='chat-list__item__info__name'>{chat.name}</span>
							<span className='chat-list__item__info__message'>
								{chat.message.length >= 12
									? chat.message.substring(0, 15) + "..."
									: chat.message}
							</span>
						</div>
						<div className='chat-list__item__time'>{chat.time}</div>
						{chat.unread > 0 ? (
							chat.unread > 99 ? (
								<div className='chat-list__item__unread'>99+</div>
							) : (
								<div className='chat-list__item__unread'>{chat.unread}</div>
							)
						) : null}
					</div>
				))}
			</div>
		);
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<Box className='container'>
				<Box className='wrapper'>
					<Box className='searchbar'>
						<TextField
							placeholder='Поиск'
							size='small'
							className='searchbar__input-field'
						/>
					</Box>
					<Box className='sidebar'>
						<Typography variant='h6' className='sidebar__header'>
							Чаты
						</Typography>
						<div className='sidebar__scroll-container'>{ChatPanel(chats)}</div>
					</Box>
				</Box>
				<Box className='chat-window'>
					<Box className='chat-window__header'>
						<Avatar
							alt={"Anil"}
							src={"src/resources/img/avatar.png"}
							className='chat-window__header__avatar'
						/>
						<div>
							<Typography variant='h6'>Anil</Typography>
							<Typography variant='body2'>Online - Last seen, 2.02pm</Typography>
						</div>
					</Box>
					<Box className='sidebar__scroll-container'>
						<Box className='chat-window__messages'>
							{messages.map((msg, index) => (
								<Box
									className='chat-window__messages__field'
									key={index}
									sx={{
										margin: 1,
										padding: 1,

										// alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
										backgroundColor:
											msg.sender === "You" ? "#d1c4e9" : "#eeeeee",
										// borderRadius: 6,
									}}
								>
									<Typography variant='body2'>{msg.text}</Typography>
									<Typography variant='caption'>{msg.time}</Typography>
								</Box>
							))}
						</Box>
					</Box>
					<Box className='chat-window__input'>
						<InputBase
							placeholder='Type your message here...'
							fullWidth
							className='chat-window__base'
						/>
					</Box>
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default Chat;
