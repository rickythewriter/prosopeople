import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TopNav from './TopNav';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu'
import MainView from './MainView';
import ImageModal from './ImageModal';
import { ImageModalContext, ImageModalContextProvider } from '../../contexts/ImageModalContext';
import './Dashboard.css';

export default function Dashboard() {
	/* Initialize User information */
	const user = useSelector(state => state.session.user);

	/*  Render the Dashboard view */
	if (user) {
		return (
			<div id="dashboard">
				<ImageModalContextProvider>
					<AppInternal />
				</ImageModalContextProvider>
			</div>
		);
	} else {
		return (
			<Redirect to="/" />
		)
	}
}

const AppInternal = () => {
	/* 
		Read newEntrySelected state from RightMenu;
		Affects MainView
	*/
	const [newEntrySelected, setNewEntrySelected] = useState(false)

	/* 
		Listen for whether a Person has been selected. 
		Affects both
			RightMenu, and
			MainView
	*/
	const person = useSelector(state => state.person);
	const personValues = Object.values(person);
	const [personIsSelected, setPersonIsSelected] = useState(false)
	useEffect(() => {
		setPersonIsSelected(personValues.length)
	}, [person, personValues.length]);

	/*
		Read showTags state from MainView FormPersonRU;
		Determine whether RightMenu displays TagsCRD.		
	*/
	const [showTags, setShowTags] = useState(false)

	const { seeImageModal, image } = useContext(ImageModalContext);

	return (
		<>
			{seeImageModal && <ImageModal image={image}/>}
			<div id="container-top-nav">
				<TopNav />
			</div>
			<div id="dashboard-body">
				<div className="horizontal-panel" id="container-left-menu">
					<LeftMenu
						setNewEntrySelected={setNewEntrySelected}
					/>
				</div>
				<div className="horizontal-panel" id="container-right-menu">
					<RightMenu
						personIsSelected={personIsSelected}
						setNewEntrySelected={setNewEntrySelected}
						showTags={showTags}
						setShowTags={setShowTags}
					/>
				</div>
				<div className="horizontal-panel" id="container-main-view">
					<MainView
						personIsSelected={personIsSelected}
						newEntrySelected={newEntrySelected}
					/>
				</div>
			</div>
		</>
	)
}