import { getContext, onMount } from "svelte";

export interface RenderElement {
	ready: boolean;
	mounted: boolean;
	setup?: (props: any) => Promise<any> | void;
	render?: RenderFunction;
	//tearDown?: () => void;
}

export interface RenderFunction {
	(props: any, dt: number): void;
}

export class CanvasRenderCollection{
	constructor(private renderElements: RenderElement[]) {
	}
	add(fn) {
		this.remove(fn);
        this.renderElements.push(fn as RenderElement);
              
        };
	remove(fn) {
	const idx = this.renderElements.indexOf(fn as RenderElement);
	if (idx >= 0) this.renderElements.splice(idx, 1);
	}
	getState: () => unknown;
}

export const registerRenderElm = (renderable: RenderElement | RenderFunction, key:symbol) => {
	const collection = getContext<CanvasRenderCollection>(key);
	console.log("collection", collection);
	const element = {
		ready: false,
		mounted: false,
	} as RenderElement;
	if (typeof renderable === 'function') element.render = renderable;
	else if (renderable) {
		if (renderable.render) element.render = renderable.render;
		if (renderable.setup) element.setup = renderable.setup;
	}
	collection.add(element);
	onMount(() => {
		element.mounted = true;
		return () => {
			collection.remove(element);
			element.mounted = false;
		};
	});
}

export function createLoop(renderElements : RenderElement[], props: any) {      
	let time = 0;
	let elapsed = 0;
	let lastTime = performance.now();
	let frame;
	let killLoopOnError = true;

	function render(dt: number) {
	renderElements.forEach((entity) => {
	  try {
		if (entity.mounted && entity.ready && entity.render) {
		  entity.render(props, dt);
		}
	  } catch (err) {
		console.error(err);
		if (killLoopOnError) {
		  cancelAnimationFrame(frame);
		  console.warn('Animation loop stopped due to an error');
		}
	  }
	});
	}
	//Todo: add fps
	function loop(now) {
	  frame = requestAnimationFrame(loop);
	  const dt = (now - lastTime) / 1000;
	  lastTime = now;
	  elapsed += dt;
	  time = elapsed;		
	  render(dt);
	}
	loop(time); 
	return () => {
	  cancelAnimationFrame(frame);
	};
}
